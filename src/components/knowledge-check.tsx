"use client";

import { useState } from "react";
import { Button, Notice } from "./ui";
import type { LessonCopy } from "@/content/learning";
import type { Locale } from "@/i18n/dictionaries";

export function KnowledgeCheck({
  check,
  locale,
}: {
  check: LessonCopy["check"];
  locale: Locale;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const pt = locale === "pt-BR";
  return (
    <section className="fp-knowledge">
      <h2>{pt ? "Confira seu entendimento" : "Check your understanding"}</h2>
      <fieldset>
        <legend>{check.question}</legend>
        {check.options.map((option, index) => (
          <label key={option}>
            <input
              type="radio"
              name="knowledge-check"
              checked={choice === index}
              onChange={() => {
                setChoice(index);
                setSubmitted(false);
              }}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <div className="fp-actions">
        <Button disabled={choice === null} onClick={() => setSubmitted(true)}>
          {pt ? "Conferir resposta" : "Check answer"}
        </Button>
      </div>
      {submitted && (
        <Notice error={choice !== check.answer}>
          {choice === check.answer
            ? pt
              ? "Isso mesmo. "
              : "That's right. "
            : pt
              ? "Reveja este ponto. "
              : "Review this point. "}
          {check.explanation}
        </Notice>
      )}
    </section>
  );
}
