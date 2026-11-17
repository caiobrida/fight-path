"use client";

import { useEffect, useState } from "react";
import {
  activeController,
  controllerIndex,
  readControllers,
  selectController,
} from "@/devices/controller-selection";
import type { Locale } from "@/i18n/dictionaries";

const copy = {
  en: {
    title: "Controller test",
    activate:
      "Connect your controller, keep this page focused and press a button. Select Gamepad in Device; start practice to score attempts.",
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
    activate:
      "Conecte o controle, mantenha esta página em foco e pressione um botão. Selecione Controle em Dispositivo; inicie o treino para avaliar tentativas.",
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

export function ControllerMonitor({ locale }: { locale: Locale }) {
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
    <section className="setup__test" aria-label={text.title}>
      <h2>{text.title}</h2>
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
            ? `${selected.mapping || "nonstandard"} · ${selected.buttons.length} / ${selected.axes.length}`
            : text.missing}
      </p>
      <p>
        {text.buttons}:{" "}
        {selected?.buttons
          .flatMap((button, i) => (button.pressed ? [i] : []))
          .join(", ") || text.none}
      </p>
      <p>
        {text.axes}:{" "}
        {selected?.axes.map((axis) => axis.toFixed(2)).join(", ") || "—"}
      </p>
      <small>{text.local}</small>
    </section>
  );
}
