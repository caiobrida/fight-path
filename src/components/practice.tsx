"use client";

import { useEffect, useRef, useState } from "react";
import { exercises, kenExercises } from "@/content/exercises";
import { GamepadAdapter } from "@/devices/gamepad";
import { KeyboardAdapter } from "@/devices/keyboard";
import { TouchAdapter } from "@/devices/touch";
import type { DeviceKind, RawSnapshot } from "@/devices/raw";
import { evaluateCommand, type Evaluation } from "@/domain/evaluator";
import {
  appendSample,
  newlyPressed,
  relativeDirection,
  type Facing,
  type InputSample,
} from "@/domain/input";
import {
  controlActions,
  defaultMapping,
  loadMapping,
  mapRaw,
  type ControlMapping,
} from "@/domain/mapping";
import { formatNumber, type Locale } from "@/i18n/dictionaries";

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
    reset: "Reset",
    setup: "Configure controls",
    back: "Back",
    history: "Your inputs",
    result: "Feedback",
    waiting: "Press start to begin.",
    active: "Perform the direction sequence and press the shown button.",
    success: "Correct sequence. Keep practicing!",
    disconnected: "Connect a gamepad and press a button.",
    attempts: "Attempts",
    correct: "Correct",
    accuracy: "Accuracy",
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
    reset: "Reiniciar",
    setup: "Configurar controles",
    back: "Voltar",
    history: "Seus inputs",
    result: "Feedback",
    waiting: "Inicie para começar.",
    active: "Faça a sequência direcional e pressione o botão indicado.",
    success: "Sequência correta. Continue praticando!",
    disconnected: "Conecte um controle e pressione um botão.",
    attempts: "Tentativas",
    correct: "Acertos",
    accuracy: "Precisão",
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

export function Practice({ locale }: { locale: Locale }) {
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
  const [history, setHistory] = useState<readonly InputSample[]>([]);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [progress, setProgress] = useState<
    Record<string, { attempts: number; correct: number }>
  >({});
  const exerciseRef = useRef(exercises[0]);
  const mappingRef = useRef(mapping);
  const facingRef = useRef(facing);
  const attemptRef = useRef<readonly InputSample[]>([]);
  const historyRef = useRef<readonly InputSample[]>([]);
  const keyboardRef = useRef<KeyboardAdapter | null>(null);
  const touchRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const saved = loadMapping(window.localStorage, device);
      mappingRef.current = saved;
      setMapping(saved);
    });
    return () => {
      cancelled = true;
    };
  }, [device]);

  useEffect(
    () => keyboardRef.current?.setCodes(Object.values(mapping)),
    [mapping],
  );

  useEffect(() => {
    if (!playing) return;
    let active = true;
    const sink = (snapshot: RawSnapshot) => {
      if (!active) return;
      setRaw(snapshot);
      if (!snapshot.connected) {
        attemptRef.current = [];
        return;
      }
      const sample = mapRaw(snapshot, mappingRef.current);
      const previous = attemptRef.current.at(-1);
      attemptRef.current = appendSample(attemptRef.current, sample);
      historyRef.current = appendSample(historyRef.current, sample, 32);
      setHistory(historyRef.current);
      if (!newlyPressed(previous, sample).length) return;
      const result = evaluateCommand(
        attemptRef.current,
        exerciseRef.current.command,
        facingRef.current,
      );
      setEvaluation(result);
      const exerciseId = exerciseRef.current.command.id;
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
      attemptRef.current = [];
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
      attemptRef.current = [];
    };
  }, [device, playing]);

  const reset = () => {
    attemptRef.current = [];
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
    setProgress((current) => ({
      ...current,
      [exerciseRef.current.command.id]: { attempts: 0, correct: 0 },
    }));
  };

  const selectExercise = (index: number) => {
    exerciseRef.current = activeExercises[index];
    setExerciseIndex(index);
    attemptRef.current = [];
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
  };

  const selectPath = (next: "universal" | "ken") => {
    exerciseRef.current = next === "ken" ? kenExercises[0] : exercises[0];
    setPath(next);
    setExerciseIndex(0);
    attemptRef.current = [];
    historyRef.current = [];
    setHistory([]);
    setEvaluation(null);
  };

  const changeDevice = (next: DeviceKind) => {
    setPlaying(false);
    reset();
    setRaw(undefined);
    setDevice(next);
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
          {device === "gamepad" && !raw?.connected && (
            <p role="status">{text.disconnected}</p>
          )}
          <div className="practice__buttons">
            <button type="button" onClick={() => setPlaying((value) => !value)}>
              {playing ? text.pause : text.start}
            </button>
            <button type="button" onClick={reset}>
              {text.reset}
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
        {device === "touch" && (
          <div ref={touchRoot} className="practice__touch">
            {controlActions.map((action) => (
              <button
                key={action}
                type="button"
                data-control={`Touch${action[0].toUpperCase()}${action.slice(1)}`}
                aria-label={action}
              >
                {action}
              </button>
            ))}
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
