"use client";

import { PracticeGuide } from "./practice-guide";
import { SyncFailure, syncFailure } from "@/domain/sync-failure";
import { OperationQueue } from "@/domain/operation-queue";
import { AttemptWindow } from "@/domain/attempt-window";

import { useControllerProfile } from "@/devices/use-controller-profile";
import { ControllerMonitor } from "./controller-monitor";
import { useEffect, useRef, useState } from "react";
import { exercises, kenExercises } from "@/content/exercises";
import { GamepadAdapter } from "@/devices/gamepad";
import { KeyboardAdapter } from "@/devices/keyboard";
import { TouchAdapter } from "@/devices/touch";
import type { DeviceKind, RawSnapshot } from "@/devices/raw";
import { evaluateCommand, type Evaluation } from "@/domain/evaluator";
import { gamification, mastery } from "@/domain/gamification";
import {
  attacks,
  appendSample,
  relativeDirection,
  type Facing,
  type InputSample,
} from "@/domain/input";
import {
  defaultMapping,
  loadMapping,
  mapRaw,
  type ControlMapping,
} from "@/domain/mapping";
import { formatNumber, type Locale } from "@/i18n/dictionaries";
import { queueAttempt, readPending, writePending } from "@/domain/pending";
import {
  progressById,
  type AttemptInput,
  type ProgressRow,
} from "@/domain/progress";

const copy = {
  en: {
    title: "Practice an input",
    intro:
      "Follow the directions, then press the shown button. FightPath checks your input sequence, not the game's combat engine.",
    lessons: "Universal practice path",
    kenLessons: "Ken Classic path",
    universal: "Universal",
    ken: "Ken Classic",
    path: "Practice path",
    source: "Official command list",
    goal: "Complete 10 correct attempts",
    completed: "Completed",
    next: "Next exercise",
    device: "Device",
    keyboard: "Keyboard",
    gamepad: "Gamepad",
    touch: "Touch",
    facing: "Facing",
    right: "Right",
    left: "Left",
    start: "Start practice",
    pause: "Pause",
    setup: "Configure controls",
    back: "Back",
    history: "Your inputs",
    result: "Feedback",
    waiting: "Press start to begin.",
    active: "Perform the direction sequence and press the shown button.",
    success: "Correct sequence. Keep practicing!",
    disconnected: "Connect a gamepad and press a button.",
    gamepadUnsupported:
      "This browser cannot read gamepads. Choose keyboard or touch.",
    touchUnsupported:
      "This browser cannot read touch controls. Choose keyboard or gamepad.",
    attempts: "Attempts",
    correct: "Correct",
    accuracy: "Accuracy",
    pathProgress: "Path progress",
    saved: "Progress saved",
    pending: "Progress waiting to sync",
    unavailable:
      "Progress is not saved yet. Keep this tab open and retry sync.",
    full: "Offline save limit reached. Retry sync to save new attempts.",
    authentication: "Sign in again to sync your pending attempts.",
    rateLimited:
      "Save limit reached. Wait before retrying; your attempts stay on this device.",
    rejected:
      "Some attempts could not be accepted. Download the unsynced attempts for review; other attempts can still sync.",
    unsynced: "Download unsynced attempts",
    retry: "Retry sync",
    export: "Export progress",
    delete: "Delete progress",
    deleteConfirm: "Permanently delete your saved FightPath progress?",
    clear: "Clear inputs",
    rewards: "Practice rewards",
    xpRule:
      "Earn 10 XP for each saved correct attempt, up to 10 per exercise. Maximum: 600 XP.",
    level: "Level",
    mastery: "Current exercise",
    starting: "Starting",
    building:
      "Building: 3 correct attempts and at least 50% accuracy in the latest 20",
    confident:
      "Confident: 10 correct attempts and at least 70% accuracy in the latest 20",
    missions: "Challenges",
    missionNames: {
      "first-motion": "First motion: 3 correct quarter circles",
      "universal-foundation":
        "Universal foundation: 3 correct attempts in each exercise",
      "ken-foundation": "Ken foundation: 3 correct attempts with each move",
    },
    reasons: {
      incomplete: "Complete the sequence and press a button.",
      "wrong-button": "Use one of the shown attack buttons.",
      "missing-direction": "A direction is missing from the sequence.",
      "wrong-order": "The directions were in the wrong order.",
      "button-early": "Press the button after the final direction.",
      "too-slow": "Try a smoother, quicker motion.",
      "extra-direction": "An extra direction interrupted the sequence.",
    },
  },
  "pt-BR": {
    title: "Pratique um comando",
    intro:
      "Siga as direções e pressione o botão indicado. O FightPath avalia a sequência de inputs, não o motor de combate do jogo.",
    lessons: "Trilha de treino universal",
    kenLessons: "Trilha do Ken Classic",
    universal: "Universal",
    ken: "Ken Classic",
    path: "Trilha de treino",
    source: "Lista oficial de comandos",
    goal: "Conclua 10 execuções corretas",
    completed: "Concluído",
    next: "Próximo exercício",
    device: "Dispositivo",
    keyboard: "Teclado",
    gamepad: "Controle",
    touch: "Toque",
    facing: "Lado",
    right: "Direita",
    left: "Esquerda",
    start: "Iniciar treino",
    pause: "Pausar",
    setup: "Configurar controles",
    back: "Voltar",
    history: "Seus inputs",
    result: "Feedback",
    waiting: "Inicie para começar.",
    active: "Faça a sequência direcional e pressione o botão indicado.",
    success: "Sequência correta. Continue praticando!",
    disconnected: "Conecte um controle e pressione um botão.",
    gamepadUnsupported:
      "Este navegador não consegue ler controles físicos. Escolha teclado ou toque.",
    touchUnsupported:
      "Este navegador não consegue ler controles de toque. Escolha teclado ou controle físico.",
    attempts: "Tentativas",
    correct: "Acertos",
    accuracy: "Precisão",
    pathProgress: "Progresso da trilha",
    saved: "Progresso salvo",
    pending: "Progresso aguardando sincronização",
    unavailable:
      "O progresso ainda não foi salvo. Mantenha esta aba aberta e tente sincronizar.",
    full: "Limite de tentativas offline atingido. Sincronize para salvar novas tentativas.",
    authentication: "Entre novamente para sincronizar as tentativas pendentes.",
    rateLimited:
      "Limite de salvamento atingido. Aguarde antes de tentar novamente; suas tentativas ficam neste dispositivo.",
    rejected:
      "Algumas tentativas n?o foram aceitas. Baixe as tentativas n?o sincronizadas para revis?o; as demais podem sincronizar.",
    unsynced: "Baixar tentativas n?o sincronizadas",
    retry: "Tentar sincronizar",
    export: "Exportar progresso",
    delete: "Excluir progresso",
    deleteConfirm: "Excluir permanentemente seu progresso salvo no FightPath?",
    clear: "Limpar inputs",
    rewards: "Recompensas de treino",
    xpRule:
      "Ganhe 10 XP por acerto salvo, até 10 por exercício. Máximo: 600 XP.",
    level: "Nível",
    mastery: "Exercício atual",
    starting: "Começando",
    building:
      "Evoluindo: 3 acertos e pelo menos 50% de precisão nas últimas 20 tentativas",
    confident:
      "Confiante: 10 acertos e pelo menos 70% de precisão nas últimas 20 tentativas",
    missions: "Desafios",
    missionNames: {
      "first-motion": "Primeiro movimento: 3 quartos de círculo corretos",
      "universal-foundation": "Base universal: 3 acertos em cada exercício",
      "ken-foundation": "Base do Ken: 3 acertos com cada golpe",
    },
    reasons: {
      incomplete: "Complete a sequência e pressione um botão.",
      "wrong-button": "Use um dos botões de ataque indicados.",
      "missing-direction": "Faltou uma direção na sequência.",
      "wrong-order": "As direções vieram na ordem errada.",
      "button-early": "Pressione o botão depois da última direção.",
      "too-slow": "Tente fazer o movimento de forma mais contínua e rápida.",
      "extra-direction": "Uma direção extra interrompeu a sequência.",
    },
  },
} as const;

const symbols: Record<string, string> = {
  down: "↓",
  "down-right": "↘",
  right: "→",
  "down-left": "↙",
  left: "←",
  neutral: "●",
  up: "↑",
  "up-left": "↖",
  "up-right": "↗",
};

const touchDirections = [
  "up-left",
  "up",
  "up-right",
  "left",
  "neutral",
  "right",
  "down-left",
  "down",
  "down-right",
] as const;

const touchLabels = {
  en: {
    "up-left": "Up left",
    up: "Up",
    "up-right": "Up right",
    left: "Left",
    right: "Right",
    "down-left": "Down left",
    down: "Down",
    "down-right": "Down right",
  },
  "pt-BR": {
    "up-left": "Cima esquerda",
    up: "Cima",
    "up-right": "Cima direita",
    left: "Esquerda",
    right: "Direita",
    "down-left": "Baixo esquerda",
    down: "Baixo",
    "down-right": "Baixo direita",
  },
} as const;

export function Practice({
  locale,
  userId,
}: {
  locale: Locale;
  userId: string;
}) {
  const profile = useControllerProfile();
  const text = copy[locale];
  const [path, setPath] = useState<"universal" | "ken">("universal");
  const activeExercises = path === "ken" ? kenExercises : exercises;
  const [device, setDevice] = useState<DeviceKind>("keyboard");
  const [facing, setFacing] = useState<Facing>("right");
  const [playing, setPlaying] = useState(false);
  const [mapping, setMapping] = useState<ControlMapping>(
    defaultMapping("keyboard"),
  );
  const [raw, setRaw] = useState<RawSnapshot>();
  const [support, setSupport] = useState({ gamepad: true, touch: true });
  const [history, setHistory] = useState<readonly InputSample[]>([]);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [progress, setProgress] = useState<
    Record<string, { attempts: number; correct: number }>
  >({});
  const [syncStatus, setSyncStatus] = useState<
    | "saved"
    | "pending"
    | "unavailable"
    | "full"
    | "authentication"
    | "rateLimited"
    | "rejected"
  >("pending");
  const [verifiedRows, setVerifiedRows] = useState<ProgressRow[]>([]);
  const exerciseRef = useRef(exercises[0]);
  const mappingRef = useRef(mapping);
  const facingRef = useRef(facing);
  const attemptRef = useRef(new AttemptWindow());
  const historyRef = useRef<readonly InputSample[]>([]);
  const keyboardRef = useRef<KeyboardAdapter | null>(null);
  const touchRoot = useRef<HTMLDivElement | null>(null);
  const pendingRef = useRef<AttemptInput[]>([]);
  const rejectedRef = useRef<AttemptInput[]>([]);
  const retryAtRef = useRef(0);
  const readyRef = useRef(false);
  const operationsRef = useRef(new OperationQueue());
  const deletingRef = useRef(false);
  const flushRef = useRef<() => Promise<void>>(async () => {});
  const retryRef = useRef<() => void>(() => {});
  const pendingStorageRef = useRef<Storage | null>(null);

  useEffect(() => {
    try {
      const preferred = window.localStorage.getItem(
        "fightpath-preferred-device",
      );
      if (
        preferred === "gamepad" ||
        preferred === "touch" ||
        preferred === "keyboard"
      )
        queueMicrotask(() => setDevice(preferred));
    } catch {}
  }, []);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setSupport({
        gamepad: typeof window.navigator.getGamepads === "function",
        touch: typeof window.PointerEvent === "function",
      });
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    try {
      pendingStorageRef.current = window.localStorage;
    } catch {
      pendingStorageRef.current = null;
    }
    try {
      pendingStorageRef.current?.removeItem("fightpath-pending-attempts");
    } catch {}
    rejectedRef.current = readPending(
      pendingStorageRef.current,
      `${userId}:rejected`,
    );
    pendingRef.current = readPending(pendingStorageRef.current, userId).slice(
      0,
      500 - rejectedRef.current.length,
    );
    const flush = () =>
      operationsRef.current.run(async () => {
        if (
          !active ||
          !readyRef.current ||
          deletingRef.current ||
          Date.now() < retryAtRef.current
        )
          return;
        try {
          while (active && !deletingRef.current && pendingRef.current.length) {
            const response = await fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pendingRef.current[0]),
            });
            if (!response.ok) {
              const failure = syncFailure(response);
              if (failure.problem === "rejected") {
                rejectedRef.current.push(pendingRef.current.shift()!);
                writePending(
                  pendingStorageRef.current,
                  `${userId}:rejected`,
                  rejectedRef.current,
                );
                writePending(
                  pendingStorageRef.current,
                  userId,
                  pendingRef.current,
                );
                continue;
              }
              throw failure;
            }
            const data = (await response.json()) as { progress: ProgressRow[] };
            if (active) setVerifiedRows(data.progress);
            pendingRef.current.shift();
            writePending(pendingStorageRef.current, userId, pendingRef.current);
            if (active && !pendingRef.current.length)
              setProgress(progressById(data.progress));
          }
          if (active)
            setSyncStatus(rejectedRef.current.length ? "rejected" : "saved");
        } catch (error) {
          if (error instanceof SyncFailure) {
            retryAtRef.current = error.retryAt;
            if (active) setSyncStatus(error.problem);
            return;
          }
          if (active)
            setSyncStatus((current) =>
              current === "full" || current === "unavailable"
                ? current
                : "pending",
            );
        }
      });
    flushRef.current = flush;
    const load = async () => {
      try {
        const response = await fetch("/api/progress", { cache: "no-store" });
        if (!response.ok) throw syncFailure(response);
        const data = (await response.json()) as { progress: ProgressRow[] };
        if (!active || deletingRef.current) return;
        setVerifiedRows(data.progress);
        const combined = progressById(data.progress);
        for (const attempt of pendingRef.current) {
          const current = combined[attempt.exerciseId] ?? {
            attempts: 0,
            correct: 0,
            recentAttempts: 0,
            recentCorrect: 0,
          };
          combined[attempt.exerciseId] = {
            ...current,
            attempts: current.attempts + 1,
            correct: current.correct + Number(attempt.correct),
          };
        }
        setProgress(combined);
        readyRef.current = true;
        setSyncStatus(pendingRef.current.length ? "pending" : "saved");
        void flush();
      } catch (error) {
        if (error instanceof SyncFailure) retryAtRef.current = error.retryAt;
        if (active)
          setSyncStatus(
            error instanceof SyncFailure ? error.problem : "unavailable",
          );
      }
    };
    void load();
    const retry = () => {
      if (Date.now() < retryAtRef.current || deletingRef.current) return;
      if (readyRef.current) void flush();
      else void load();
    };
    retryRef.current = retry;
    window.addEventListener("online", retry);
    return () => {
      active = false;
      window.removeEventListener("online", retry);
    };
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setPlaying(false);
      attemptRef.current.disconnect();
      let saved = defaultMapping(device);
      try {
        saved = loadMapping(window.localStorage, device, profile);
      } catch {
        saved = defaultMapping(device);
      }
      mappingRef.current = saved;
      setMapping(saved);
    });
    return () => {
      cancelled = true;
    };
  }, [device, profile]);

  useEffect(
    () => keyboardRef.current?.setCodes(Object.values(mapping)),
    [mapping],
  );

  useEffect(() => {
    if (!playing) return;
    const attemptWindow = attemptRef.current;
    let active = true;
    const sink = (snapshot: RawSnapshot) => {
      if (!active || deletingRef.current) return;
      setRaw(snapshot);
      if (!snapshot.connected) {
        attemptWindow.disconnect();
        return;
      }
      const sample = mapRaw(snapshot, mappingRef.current);
      const attempt = attemptWindow.observe(sample);
      historyRef.current = appendSample(historyRef.current, sample, 32);
      setHistory(historyRef.current);
      if (!attempt) return;
      const result = evaluateCommand(
        attempt,
        exerciseRef.current.command,
        facingRef.current,
      );
      setEvaluation(result);
      const exerciseId = exerciseRef.current.command.id;
      const durationMs = Math.max(
        0,
        Math.min(
          120000,
          Math.round(result.durationMs ?? sample.atMs - attempt[0].atMs),
        ),
      );
      const queued =
        pendingRef.current.length + rejectedRef.current.length >= 500
          ? null
          : queueAttempt(pendingRef.current, {
              id: window.crypto.randomUUID(),
              exerciseId,
              correct: result.correct,
              durationMs,
            });
      if (queued) {
        setProgress((current) => {
          const previousProgress = current[exerciseId] ?? {
            attempts: 0,
            correct: 0,
          };
          return {
            ...current,
            [exerciseId]: {
              attempts: previousProgress.attempts + 1,
              correct: previousProgress.correct + Number(result.correct),
            },
          };
        });
        pendingRef.current = queued;
        const stored = writePending(pendingStorageRef.current, userId, queued);
        setSyncStatus(stored ? "pending" : "unavailable");
        void flushRef.current();
      } else {
        setSyncStatus("full");
        void flushRef.current();
      }
      attemptWindow.clear();
    };
    const adapter =
      device === "keyboard"
        ? new KeyboardAdapter(window, sink, Object.values(mappingRef.current))
        : device === "gamepad"
          ? new GamepadAdapter(window, sink)
          : touchRoot.current
            ? new TouchAdapter(touchRoot.current, sink)
            : null;
    if (adapter instanceof KeyboardAdapter) keyboardRef.current = adapter;
    adapter?.start();
    return () => {
      active = false;
      adapter?.stop();
      keyboardRef.current = null;
      attemptWindow.disconnect();
    };
  }, [device, playing, userId]);

  const reset = () => {
    attemptRef.current.clear();
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
  };

  const deleteProgress = async () => {
    if (deletingRef.current || !window.confirm(text.deleteConfirm)) return;
    deletingRef.current = true;
    setPlaying(false);
    const ready = readyRef.current;
    readyRef.current = false;
    try {
      await operationsRef.current.run(async () => {
        const response = await fetch("/api/progress", { method: "DELETE" });
        if (!response.ok) throw new Error("Progress delete failed");
        pendingRef.current = [];
        rejectedRef.current = [];
        writePending(pendingStorageRef.current, `${userId}:rejected`, []);
        writePending(pendingStorageRef.current, userId, []);
        readyRef.current = false;
        setProgress({});
        setVerifiedRows([]);
        setSyncStatus("pending");
        window.location.reload();
      });
    } catch {
      readyRef.current = ready;
      setSyncStatus("unavailable");
    } finally {
      deletingRef.current = false;
    }
  };

  const selectExercise = (index: number) => {
    exerciseRef.current = activeExercises[index];
    setExerciseIndex(index);
    attemptRef.current.clear();
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
  };

  const selectPath = (next: "universal" | "ken") => {
    exerciseRef.current = next === "ken" ? kenExercises[0] : exercises[0];
    setPath(next);
    setExerciseIndex(0);
    attemptRef.current.clear();
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
  };

  const changeDevice = (next: DeviceKind) => {
    setPlaying(false);
    reset();
    setRaw(undefined);
    setDevice(next);
    try {
      window.localStorage.setItem("fightpath-preferred-device", next);
    } catch {}
  };

  const feedback = evaluation
    ? evaluation.correct
      ? text.success
      : text.reasons[evaluation.reason!]
    : playing
      ? text.active
      : text.waiting;
  const exercise = activeExercises[exerciseIndex];
  const { attempts = 0, correct = 0 } = progress[exercise.command.id] ?? {};
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const pathTotals = activeExercises.reduce(
    (totals, item) => {
      const count = progress[item.command.id];
      return {
        attempts: totals.attempts + (count?.attempts ?? 0),
        correct: totals.correct + (count?.correct ?? 0),
      };
    },
    { attempts: 0, correct: 0 },
  );
  const rewards = gamification(verifiedRows);
  const currentMastery = mastery(
    verifiedRows.find((row) => row.exerciseId === exercise.command.id),
  );

  return (
    <main className="practice">
      <div className="practice__content">
        <header className="practice__header">
          <a href={`/${locale}`}>{text.back}</a>
          <a href={`/${locale}/setup`}>{text.setup}</a>
        </header>
        <p className="eyebrow">FightPath</p>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <div className="fp-actions">
          <PracticeGuide locale={locale} />
        </div>
        <ControllerMonitor
          locale={locale}
          onUse={() => changeDevice("gamepad")}
        />
        <label className="practice__path">
          {text.path}
          <select
            value={path}
            onChange={(event) =>
              selectPath(event.target.value as "universal" | "ken")
            }
          >
            <option value="universal">{text.universal}</option>
            <option value="ken">{text.ken}</option>
          </select>
        </label>
        <section
          className="practice__lessons"
          aria-label={path === "ken" ? text.kenLessons : text.lessons}
        >
          <h2>{path === "ken" ? text.kenLessons : text.lessons}</h2>
          <div>
            {activeExercises.map((item, index) => (
              <button
                key={item.command.id}
                type="button"
                aria-pressed={index === exerciseIndex}
                onClick={() => selectExercise(index)}
              >
                <span>
                  {index + 1}. {item.title[locale]}
                </span>
                <small>
                  {Math.min(progress[item.command.id]?.correct ?? 0, item.goal)}
                  /{item.goal}
                  {(progress[item.command.id]?.correct ?? 0) >= item.goal
                    ? ` · ${text.completed}`
                    : ""}
                </small>
              </button>
            ))}
          </div>
        </section>
        <section className="practice__panel">
          <h2>{exercise.title[locale]}</h2>
          {exercise.description && <p>{exercise.description[locale]}</p>}
          {exercise.source && (
            <p>
              <a
                href={exercise.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.source}
              </a>
            </p>
          )}
          <p>
            {text.goal}: {Math.min(correct, exercise.goal)}/{exercise.goal}
          </p>
          <div
            className="practice__sequence"
            aria-label={exercise.title[locale]}
          >
            {exercise.command.directions.map((direction, index) => (
              <span key={`${direction}-${index}`}>
                {symbols[relativeDirection(direction, facing)]}
              </span>
            ))}
            <span>+</span>
            <span>{exercise.command.attacks.join(" / ")}</span>
          </div>
          <div className="practice__options">
            <label>
              {text.device}
              <select
                value={device}
                onChange={(event) =>
                  changeDevice(event.target.value as DeviceKind)
                }
              >
                <option value="keyboard">{text.keyboard}</option>
                <option value="gamepad">{text.gamepad}</option>
                <option value="touch">{text.touch}</option>
              </select>
            </label>
            <label>
              {text.facing}
              <select
                value={facing}
                onChange={(event) => {
                  const value = event.target.value as Facing;
                  attemptRef.current.clear();
                  facingRef.current = value;
                  setFacing(value);
                  reset();
                }}
              >
                <option value="right">{text.right}</option>
                <option value="left">{text.left}</option>
              </select>
            </label>
          </div>
          {device === "gamepad" && (!support.gamepad || !raw?.connected) && (
            <p role="status">
              {support.gamepad ? text.disconnected : text.gamepadUnsupported}
            </p>
          )}
          {device === "touch" && !support.touch && (
            <p role="status">{text.touchUnsupported}</p>
          )}
          <div className="practice__buttons">
            <button
              type="button"
              disabled={
                (device === "gamepad" && !support.gamepad) ||
                (device === "touch" && !support.touch)
              }
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? text.pause : text.start}
            </button>
            <button type="button" onClick={reset}>
              {text.clear}
            </button>
            {correct >= exercise.goal &&
              exerciseIndex < activeExercises.length - 1 && (
                <button
                  type="button"
                  onClick={() => selectExercise(exerciseIndex + 1)}
                >
                  {text.next}
                </button>
              )}
          </div>
        </section>
        {device === "touch" && support.touch && (
          <div ref={touchRoot} className="practice__touch">
            <div className="practice__dpad">
              {touchDirections.map((direction) =>
                direction === "neutral" ? (
                  <span key={direction} aria-hidden="true" />
                ) : (
                  <button
                    key={direction}
                    type="button"
                    data-control={`Touch${direction
                      .split("-")
                      .map((part) => part[0].toUpperCase() + part.slice(1))
                      .join("")}`}
                    aria-label={touchLabels[locale][direction]}
                  >
                    {symbols[direction]}
                  </button>
                ),
              )}
            </div>
            <div className="practice__attacks">
              {attacks.map((attack) => (
                <button
                  key={attack}
                  type="button"
                  data-control={`Touch${attack}`}
                  aria-label={attack}
                >
                  {attack}
                </button>
              ))}
            </div>
          </div>
        )}
        <section className="practice__feedback" aria-live="polite">
          <h2>{text.result}</h2>
          <p>
            {feedback}
            {evaluation?.missingDirection
              ? ` ${symbols[evaluation.missingDirection]}`
              : ""}
          </p>
        </section>
        <div className="practice__stats">
          <div>
            <span>{text.attempts}</span>
            <strong>{formatNumber(locale, attempts)}</strong>
          </div>
          <div>
            <span>{text.correct}</span>
            <strong>{formatNumber(locale, correct)}</strong>
          </div>
          <div>
            <span>{text.accuracy}</span>
            <strong>{formatNumber(locale, accuracy)}%</strong>
          </div>
        </div>
        <p className="practice__path-progress">
          {text.pathProgress}: {formatNumber(locale, pathTotals.correct)}/
          {formatNumber(locale, pathTotals.attempts)}
        </p>
        <section className="practice__rewards">
          <h2>{text.rewards}</h2>
          <p>{text.xpRule}</p>
          <div className="practice__reward-stats">
            <strong>{formatNumber(locale, rewards.xp)} XP</strong>
            <strong>
              {text.level} {formatNumber(locale, rewards.level)}
            </strong>
          </div>
          <p>
            {text.mastery}: {text[currentMastery]}
          </p>
          <h3>{text.missions}</h3>
          <ul>
            {rewards.missions.map((mission) => (
              <li key={mission.id}>
                <span>{text.missionNames[mission.id]}</span>
                <strong>
                  {formatNumber(locale, mission.current)}/
                  {formatNumber(locale, mission.goal)}
                  {mission.complete ? ` · ${text.completed}` : ""}
                </strong>
              </li>
            ))}
          </ul>
        </section>
        <section className="practice__data" aria-live="polite">
          <p>{text[syncStatus]}</p>
          {syncStatus !== "saved" && (
            <button type="button" onClick={() => retryRef.current()}>
              {text.retry}
            </button>
          )}
          {syncStatus !== "saved" && (
            <button
              type="button"
              onClick={() => {
                const blob = new Blob(
                  [
                    JSON.stringify(
                      {
                        pending: pendingRef.current,
                        rejected: rejectedRef.current,
                      },
                      null,
                      2,
                    ),
                  ],
                  { type: "application/json" },
                );
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "fightpath-unsynced.json";
                link.click();
                window.setTimeout(() => URL.revokeObjectURL(url), 1000);
              }}
            >
              {text.unsynced}
            </button>
          )}
          <a href="/api/progress/export" download>
            {text.export}
          </a>
          <button type="button" onClick={() => void deleteProgress()}>
            {text.delete}
          </button>
        </section>
        <section className="practice__history">
          <h2>{text.history}</h2>
          <ol>
            {history.slice(-12).map((sample, index) => (
              <li key={`${sample.atMs}-${index}`}>
                <span>{symbols[sample.direction]}</span>
                <span>{sample.buttons.join(" + ") || "—"}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
