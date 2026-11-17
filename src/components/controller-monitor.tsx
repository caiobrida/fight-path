"use client";

import { Button } from "./ui";
import { useEffect, useState } from "react";
import {
  activeController,
  controllerIndex,
  readControllers,
  selectController,
} from "@/devices/controller-selection";
import type { Locale } from "@/i18n/dictionaries";
import { controlLabel } from "@/devices/control-label";
import type { DeviceKind } from "@/devices/raw";

const copy = {
  en: {
    title: "Controller test",
    use: "Use this controller",
    activate:
      "Connect your controller, keep this page focused and press a button. Choose the controller whose buttons respond below.",
    inactive:
      "Controller detected, but input is using another device. Select Use this controller to configure or practice with it.",
    active:
      "Controller selected for input. In practice, start the session to record attempts.",
    details: "Technical details",
    connected: "Connected",
    device: "Active controller",
    automatic: "First connected controller",
    missing: "Waiting for a controller",
    error:
      "Controller access is unavailable. Check browser permissions or use keyboard or touch.",
    buttons: "Held buttons",
    axes: "Stick axes",
    none: "None",
    local: "This test stays on your device.",
  },
  "pt-BR": {
    title: "Teste do controle",
    use: "Usar este controle",
    activate:
      "Conecte o controle, mantenha esta página em foco e pressione um botão. Escolha o controle cujos botões respondem abaixo.",
    inactive:
      "Controle detectado, mas a entrada está usando outro dispositivo. Selecione Usar este controle para configurar ou treinar com ele.",
    active:
      "Controle selecionado para entrada. No treino, inicie a sessão para registrar tentativas.",
    details: "Detalhes técnicos",
    connected: "Conectado",
    device: "Controle ativo",
    automatic: "Primeiro controle conectado",
    missing: "Aguardando um controle",
    error:
      "Não foi possível acessar controles. Verifique as permissões do navegador ou use teclado ou toque.",
    buttons: "Botões pressionados",
    axes: "Eixos do analógico",
    none: "Nenhum",
    local: "Este teste fica apenas no seu dispositivo.",
  },
};

export function ControllerMonitor({
  locale,
  device,
  onUse,
}: {
  locale: Locale;
  device: DeviceKind;
  onUse?: () => void;
}) {
  const text = copy[locale];
  const [pads, setPads] = useState<Gamepad[]>([]);
  const [index, setIndex] = useState<number | undefined>(controllerIndex);
  const [error, setError] = useState(false);
  useEffect(() => {
    const poll = () => {
      try {
        setPads(readControllers(window));
        setError(false);
      } catch {
        setPads([]);
        setError(true);
      }
    };
    const timer = window.setInterval(poll, 100);
    return () => window.clearInterval(timer);
  }, []);
  const selected = activeController(pads, index);
  return (
    <section className="fp-controller" aria-label={text.title}>
      <h2>
        {text.title} · {selected ? text.connected : text.missing}
      </h2>
      <p>{text.activate}</p>
      <label>
        {text.device}
        <select
          value={index ?? "auto"}
          onChange={(event) => {
            const next =
              event.target.value === "auto"
                ? undefined
                : Number(event.target.value);
            setIndex(next);
            selectController(next);
          }}
        >
          <option value="auto">{text.automatic}</option>
          {pads.map((pad) => (
            <option key={pad.index} value={pad.index}>
              {pad.index + 1}: {pad.id}
            </option>
          ))}
          {index !== undefined && !pads.some((pad) => pad.index === index) && (
            <option value={index}>
              {index + 1}: {text.missing}
            </option>
          )}
        </select>
      </label>
      <p role="status">
        {error
          ? text.error
          : selected
            ? device === "gamepad"
              ? text.active
              : text.inactive
            : text.missing}
      </p>
      {selected && onUse && device !== "gamepad" && (
        <div className="fp-actions">
          <Button onClick={onUse}>{text.use}</Button>
        </div>
      )}
      <p>
        {text.buttons}:{" "}
        {selected?.buttons
          .flatMap((button, i) =>
            button.pressed
              ? [
                  controlLabel(
                    `Button${i}`,
                    selected.mapping === "standard",
                    locale,
                  ),
                ]
              : [],
          )
          .join(", ") || text.none}
      </p>
      <details>
        <summary>{text.details}</summary>
        {selected && (
          <p>{`${selected.mapping || "nonstandard"} · ${selected.buttons.length} / ${selected.axes.length}`}</p>
        )}
        <p>
          {text.axes}:{" "}
          {selected?.axes.map((axis) => axis.toFixed(2)).join(", ") || "—"}
        </p>
      </details>
      <small>{text.local}</small>
    </section>
  );
}
