"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import {
  currentActivities,
  type ActivityKind,
  type LearningActivity,
} from "@/domain/learning-progress";
import type { Lesson } from "@/content/learning";
import type { Locale } from "@/i18n/dictionaries";
import { KnowledgeCheck } from "./knowledge-check";
import { ActionLink, Button, Notice } from "./ui";

export function LessonActivity({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: Locale;
}) {
  const { user } = useUser();
  return (
    <AccountActivity
      key={`${user?.id ?? "visitor"}:${lesson.id}:${lesson.revision}`}
      userId={user?.id}
      lesson={lesson}
      locale={locale}
    />
  );
}

function AccountActivity({
  userId,
  lesson,
  locale,
}: {
  userId?: string;
  lesson: Lesson;
  locale: Locale;
}) {
  const pt = locale === "pt-BR";
  const [rows, setRows] = useState<LearningActivity[]>([]);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const pending = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const completed = currentActivities(rows, lesson.id, lesson.revision);
  useEffect(() => {
    const abort = new AbortController();
    controller.current = abort;
    if (userId)
      fetch("/api/learning", { cache: "no-store", signal: abort.signal })
        .then(async (response) => {
          if (!response.ok) throw new Error("Unavailable");
          const data = await response.json();
          if (!abort.signal.aborted) setRows(data.activities);
        })
        .catch(() => {
          if (!abort.signal.aborted) setError(true);
        })
        .finally(() => {
          if (!abort.signal.aborted) setReady(true);
        });
    return () => abort.abort();
  }, [userId]);
  async function save(kind: ActivityKind, answer?: number) {
    if (!userId || !ready || pending.current || completed.has(kind)) return;
    pending.current = true;
    setBusy(true);
    setError(false);
    try {
      const response = await fetch("/api/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          revision: lesson.revision,
          kind,
          answer,
        }),
        signal: controller.current?.signal,
      });
      if (!response.ok) throw new Error("Unavailable");
      const data = await response.json();
      if (!controller.current?.signal.aborted) setRows(data.activities);
    } catch {
      if (!controller.current?.signal.aborted) setError(true);
    } finally {
      pending.current = false;
      if (!controller.current?.signal.aborted) setBusy(false);
    }
  }
  return (
    <>
      <KnowledgeCheck
        check={lesson.copy[locale].check}
        locale={locale}
        disabled={Boolean(userId) && (!ready || busy)}
        onAnswer={(answer) => {
          void save("check", answer);
        }}
      />
      <section className="fp-lesson__drill">
        <h2>{pt ? "Seu registro de aprendizado" : "Your learning record"}</h2>
        <p>
          {pt
            ? "Leitura e respostas não comprovam execução. O treino no jogo é uma declaração sua, sem validação automática. Estas atividades não alteram o XP dos comandos."
            : "Reading and answers do not prove execution. In-game practice is self-reported, without automatic validation. These activities do not change input-practice XP."}
        </p>
        {userId ? (
          <>
            <div className="fp-actions">
              <Button
                disabled={!ready || busy || completed.has("read")}
                onClick={() => {
                  void save("read");
                }}
              >
                {completed.has("read")
                  ? pt
                    ? "Leitura registrada"
                    : "Reading recorded"
                  : pt
                    ? "Marcar como lida"
                    : "Mark as read"}
              </Button>
              <Button
                variant="secondary"
                disabled={!ready || busy || completed.has("drill")}
                onClick={() => {
                  void save("drill");
                }}
              >
                {completed.has("drill")
                  ? pt
                    ? "Treino declarado"
                    : "Practice reported"
                  : pt
                    ? "Pratiquei este exercício no jogo"
                    : "I practiced this drill in the game"}
              </Button>
            </div>
            <p aria-live="polite">
              {completed.has("check")
                ? pt
                  ? "Resposta correta registrada."
                  : "Correct check recorded."
                : pt
                  ? "Confira a resposta acima para registrar o entendimento."
                  : "Check your answer above to record understanding."}
            </p>
          </>
        ) : (
          <ActionLink
            href={`/${locale}/sign-in?returnTo=${encodeURIComponent(`/${locale}/learn/${lesson.id}`)}`}
          >
            {pt
              ? "Entrar para salvar o registro"
              : "Sign in to save your record"}
          </ActionLink>
        )}
        {error && (
          <Notice error>
            {pt
              ? "Não foi possível sincronizar. Confira sua sessão e tente registrar novamente. Nenhuma conclusão foi presumida."
              : "Could not sync. Check your session and try recording again. No completion was assumed."}
          </Notice>
        )}
      </section>
    </>
  );
}
