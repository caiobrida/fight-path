"use client";

import { useState } from "react";
import type { ComboRecipe } from "@/content/combos";
import { facingNotation } from "@/domain/combo-notation";
import { ComboNotation } from "./combo-notation";
import type { Locale } from "@/i18n/dictionaries";
import { Notation } from "./ui";

export function ComboSteps({
  recipe,
  locale,
}: {
  recipe: ComboRecipe;
  locale: Locale;
}) {
  const [facing, setFacing] = useState<"left" | "right">("right");
  const pt = locale === "pt-BR";
  const transitions = {
    en: {
      start: "Start",
      chain: "Chain / target",
      link: "Link / juggle",
      cancel: "Cancel",
      followup: "Follow-up",
    },
    "pt-BR": {
      start: "Início",
      chain: "Chain / target",
      link: "Link / juggle",
      cancel: "Cancelamento",
      followup: "Continuação",
    },
  };
  return (
    <section>
      <h2>{pt ? "Sequência do combo" : "Combo sequence"}</h2>
      <label>
        {pt ? "Lado" : "Facing"}
        <select
          value={facing}
          onChange={(event) =>
            setFacing(event.target.value as "left" | "right")
          }
        >
          <option value="right">
            {pt ? "Para a direita" : "Facing right"}
          </option>
          <option value="left">{pt ? "Para a esquerda" : "Facing left"}</option>
        </select>
      </label>
      <p>
        {pt
          ? "Teclado numérico: 2 baixo, 5 neutro, 6 direita, 4 esquerda, 8 cima; diagonais nos cantos. O seletor espelha os números horizontais; os ataques continuam iguais. LP/MP/HP: socos leve/médio/forte; LK/MK/HK: chutes. KK: dois chutes juntos."
          : "Numpad: 2 down, 5 neutral, 6 right, 4 left, 8 up; diagonals occupy the corners. Facing mirrors horizontal numbers; attacks stay the same. LP/MP/HP: light/medium/heavy punches; LK/MK/HK: kicks. KK: two kicks together."}
      </p>
      {recipe.notation && (
        <ComboNotation
          notation={recipe.notation}
          locale={locale}
          facing={facing}
        />
      )}
      <p className="fp-combo-legend">
        {pt
          ? "> = cancelamento · vírgula = sequência/link/juggle · ~ = chain/target/continuação · / = alternativas · (...) = trecho opcional · {...} = grupo · dl. = atraso · CH = Counter Hit · PC = Punish Counter · DI = Drive Impact · DRC = Drive Rush cancel · PDR = Parry Drive Rush. Notação de acordo com a fonte."
          : "> = cancel · comma = sequence/link/juggle · ~ = chain/target/follow-up · / = alternatives · (...) = optional part · {...} = group · dl. = delay · CH = Counter Hit · PC = Punish Counter · DI = Drive Impact · DRC = Drive Rush cancel · PDR = Parry Drive Rush. Notation follows the source."}
      </p>
      {recipe.template && (
        <p>
          {pt
            ? "Esta entrada é um trecho ou modelo com continuação na fonte. As reticências e os golpes genéricos foram preservados."
            : "This entry is a segment or template with a continuation in the source. Ellipses and generic starters are preserved."}
        </p>
      )}
      {recipe.steps.length > 0 && (
        <ol className="fp-steps">
          {recipe.steps.map((step, i) => (
            <li key={i}>
              <strong>{transitions[locale][step.transition]}</strong>
              <Notation
                label={`${i + 1}: ${transitions[locale][step.transition]}`}
              >
                {facingNotation(step.directions, facing)} {step.attack}
              </Notation>
            </li>
          ))}
        </ol>
      )}
      {recipe.evidence.rightClip && recipe.evidence.leftClip && (
        <>
          <video
            key={facing}
            controls
            preload="none"
            poster="/images/range-study.svg"
            src={
              facing === "right"
                ? recipe.evidence.rightClip
                : recipe.evidence.leftClip
            }
          >
            <track
              default
              kind="captions"
              src={recipe.evidence.captions[locale]}
              srcLang={pt ? "pt-BR" : "en"}
              label={pt ? "Português" : "English"}
            />
          </video>
          <p>
            <a
              href={
                facing === "right"
                  ? recipe.evidence.rightClip
                  : recipe.evidence.leftClip
              }
            >
              {pt
                ? "Abrir demonstração se o player falhar"
                : "Open demonstration if the player fails"}
            </a>
          </p>
        </>
      )}
    </section>
  );
}
