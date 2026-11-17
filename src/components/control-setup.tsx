"use client";

import { useEffect, useRef, useState } from "react";
import {
  assignControl,
  controlActions,
  defaultMapping,
  loadMapping,
  mapRaw,
  saveMapping,
  type ControlAction,
  type ControlMapping,
} from "@/domain/mapping";
import { GamepadAdapter } from "@/devices/gamepad";
import { KeyboardAdapter } from "@/devices/keyboard";
import { TouchAdapter } from "@/devices/touch";
import type { DeviceKind, RawSnapshot } from "@/devices/raw";
import type { Locale } from "@/i18n/dictionaries";
import type { Direction } from "@/domain/input";

const copy = {
  en: {
    title: "Set up controls",
    intro:
      "Choose a device, select an action, press a control, then test and save.",
    device: "Device",
    keyboard: "Keyboard",
    gamepad: "Gamepad",
    touch: "Touch",
    connected: "Gamepad connected",
    missing: "No gamepad detected. Connect one and press a button.",
    mapping: "Press a control for",
    conflict: "That control is already assigned.",
    saved: "Layout saved on this device.",
    saveError: "Could not save the layout on this device.",
    save: "Save layout",
    reset: "Reset",
    test: "Current input",
    back: "Back",
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
  },
  "pt-BR": {
    title: "Configure os controles",
    intro:
      "Escolha um dispositivo e uma ação, pressione um controle, depois teste e salve.",
    device: "Dispositivo",
    keyboard: "Teclado",
    gamepad: "Controle",
    touch: "Toque",
    connected: "Controle conectado",
    missing: "Nenhum controle detectado. Conecte um e pressione um botão.",
    mapping: "Pressione um controle para",
    conflict: "Esse controle já está atribuído.",
    saved: "Layout salvo neste dispositivo.",
    saveError: "Não foi possível salvar o layout neste dispositivo.",
    save: "Salvar layout",
    reset: "Redefinir",
    test: "Input atual",
    back: "Voltar",
    up: "Cima",
    down: "Baixo",
    left: "Esquerda",
    right: "Direita",
  },
} as const;

const directionNames: Record<Locale, Record<Direction, string>> = {
  en: {
    neutral: "Neutral",
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
    "up-left": "Up-left",
    "up-right": "Up-right",
    "down-left": "Down-left",
    "down-right": "Down-right",
  },
  "pt-BR": {
    neutral: "Neutro",
    up: "Cima",
    down: "Baixo",
    left: "Esquerda",
    right: "Direita",
    "up-left": "Cima-esquerda",
    "up-right": "Cima-direita",
    "down-left": "Baixo-esquerda",
    "down-right": "Baixo-direita",
  },
};

export function ControlSetup({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [device, setDevice] = useState<DeviceKind>("keyboard");
  const [mapping, setMapping] = useState<ControlMapping>(
    defaultMapping("keyboard"),
  );
  const [raw, setRaw] = useState<RawSnapshot>();
  const [active, setActive] = useState<ControlAction | null>(null);
  const [message, setMessage] = useState("");
  const mappingRef = useRef(mapping);
  const activeRef = useRef(active);
  const prior = useRef(new Set<string>());
  const keyboard = useRef<KeyboardAdapter | null>(null);
  const touchRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const saved = loadMapping(window.localStorage, device);
      mappingRef.current = saved;
      setMapping(saved);
      setRaw(undefined);
      setMessage("");
      activeRef.current = null;
      setActive(null);
    });
    return () => {
      cancelled = true;
    };
  }, [device]);

  useEffect(() => {
    const sink = (snapshot: RawSnapshot) => {
      const fresh = snapshot.controls.find(
        (control) => !prior.current.has(control),
      );
      prior.current = new Set(snapshot.controls);
      setRaw(snapshot);
      if (!activeRef.current || !fresh) return;
      try {
        const updated = assignControl(
          mappingRef.current,
          activeRef.current,
          fresh,
        );
        mappingRef.current = updated;
        setMapping(updated);
        setMessage("");
        activeRef.current = null;
        setActive(null);
        keyboard.current?.setCaptureAll(false);
      } catch {
        setMessage(text.conflict);
      }
    };
    const adapter =
      device === "keyboard"
        ? new KeyboardAdapter(window, sink, Object.values(mappingRef.current))
        : device === "gamepad"
          ? new GamepadAdapter(window, sink)
          : touchRoot.current
            ? new TouchAdapter(touchRoot.current, sink)
            : null;
    if (adapter instanceof KeyboardAdapter) keyboard.current = adapter;
    adapter?.start();
    return () => {
      adapter?.stop();
      keyboard.current = null;
      prior.current.clear();
    };
  }, [device, text.conflict]);

  useEffect(
    () => keyboard.current?.setCodes(Object.values(mapping)),
    [mapping],
  );

  const choose = (action: ControlAction) => {
    activeRef.current = action;
    setActive(action);
    setMessage("");
    prior.current = new Set(raw?.controls ?? []);
    keyboard.current?.setCaptureAll(true);
  };

  const reset = () => {
    const initial = defaultMapping(device);
    mappingRef.current = initial;
    setMapping(initial);
    setMessage("");
    activeRef.current = null;
    setActive(null);
    keyboard.current?.setCaptureAll(false);
  };

  const input = raw ? mapRaw(raw, mapping) : null;

  return (
    <main className="setup">
      <div className="setup__content">
        <a href={`/${locale}`}>{text.back}</a>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <label htmlFor="device">{text.device}</label>
        <select
          id="device"
          value={device}
          onChange={(event) => setDevice(event.target.value as DeviceKind)}
        >
          <option value="keyboard">{text.keyboard}</option>
          <option value="gamepad">{text.gamepad}</option>
          <option value="touch">{text.touch}</option>
        </select>
        {device === "gamepad" && (
          <p role="status">{raw?.connected ? text.connected : text.missing}</p>
        )}
        <div className="setup__grid">
          {controlActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => choose(action)}
              aria-pressed={active === action}
            >
              <strong>
                {action in text ? text[action as keyof typeof text] : action}
              </strong>
              <span>{mapping[action]}</span>
            </button>
          ))}
        </div>
        {active && (
          <p role="status">
            {text.mapping} {active}
          </p>
        )}
        {message && <p role="status">{message}</p>}
        {device === "touch" && (
          <div ref={touchRoot} className="setup__touch">
            {controlActions.map((action) => (
              <button
                key={action}
                type="button"
                data-control={`Touch${action[0].toUpperCase()}${action.slice(1)}`}
                aria-label={
                  action in text ? text[action as keyof typeof text] : action
                }
              >
                {action}
              </button>
            ))}
          </div>
        )}
        <section className="setup__test" aria-live="polite">
          <h2>{text.test}</h2>
          <p>
            {input ? directionNames[locale][input.direction] : "—"} ·{" "}
            {input?.buttons.join(" + ") || "—"}
          </p>
        </section>
        <div className="setup__buttons">
          <button
            type="button"
            onClick={() => {
              try {
                saveMapping(window.localStorage, device, mapping);
                setMessage(text.saved);
              } catch {
                setMessage(text.saveError);
              }
            }}
          >
            {text.save}
          </button>
          <button type="button" onClick={reset}>
            {text.reset}
          </button>
        </div>
      </div>
    </main>
  );
}
