import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { publishedLessons } from "@/content/catalog";
import { trackNames } from "@/content/learning";
import { isLocale } from "@/i18n/dictionaries";
import { readLearning } from "@/server/learning";
import { currentActivities } from "@/domain/learning-progress";
import { ActionLink, Badge, Card, Notice } from "@/components/ui";
import { GameImage } from "@/components/game-image";
import { mediaForLesson } from "@/content/game-media";

export default async function LearningProgressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { userId } = await auth.protect({
    unauthenticatedUrl: `/${locale}/sign-in?returnTo=${encodeURIComponent(`/${locale}/learn/progress`)}`,
  });
  const pt = locale === "pt-BR";
  const rows = await readLearning(userId).catch(() => null);
  if (!rows) {
    return (
      <main className="fp-page">
        <h1>{pt ? "Seu aprendizado" : "Your learning"}</h1>
        <Notice error>
          {pt
            ? "O registro está indisponível. Tente novamente em alguns instantes."
            : "Your record is unavailable. Try again shortly."}
        </Notice>
        <ActionLink href={`/${locale}/learn`}>
          {pt ? "Continuar aprendendo" : "Keep learning"}
        </ActionLink>
      </main>
    );
  }
  const next = publishedLessons.find(
    (lesson) =>
      !currentActivities(rows, lesson.id, lesson.revision).has("read"),
  );
  return (
    <main className="fp-page">
      <h1>{pt ? "Seu caminho de aprendizado" : "Your learning path"}</h1>
      <p>
        {pt
          ? "Leitura, entendimento e treino declarado são registros diferentes. Nenhum deles certifica habilidade numa partida."
          : "Reading, understanding and self-reported practice are separate records. None certifies match skill."}
      </p>
      {next && (
        <GameImage
          media={mediaForLesson(next)}
          locale={locale}
          className="fp-progress-art"
        />
      )}
      {next && (
        <ActionLink href={`/${locale}/learn/${next.id}`}>
          {pt ? "Continuar: " : "Continue: "}
          {next.copy[locale].title}
        </ActionLink>
      )}
      {Object.entries(trackNames[locale]).map(([track, title]) => (
        <section key={track}>
          <h2>{title}</h2>
          <div className="fp-card-grid">
            {publishedLessons
              .filter((lesson) => lesson.track === track)
              .map((lesson) => {
                const state = currentActivities(
                  rows,
                  lesson.id,
                  lesson.revision,
                );
                return (
                  <Card key={lesson.id}>
                    <h3>{lesson.copy[locale].title}</h3>
                    <div className="fp-actions">
                      {(["read", "check", "drill"] as const).map((kind) => (
                        <Badge
                          key={kind}
                          tone={state.has(kind) ? "success" : "muted"}
                        >
                          {kind === "read"
                            ? pt
                              ? "Leitura"
                              : "Reading"
                            : kind === "check"
                              ? pt
                                ? "Resposta correta"
                                : "Correct check"
                              : pt
                                ? "Treino declarado"
                                : "Reported drill"}
                          : {state.has(kind) ? "✓" : "—"}
                        </Badge>
                      ))}
                    </div>
                    <ActionLink
                      variant="quiet"
                      href={`/${locale}/learn/${lesson.id}`}
                    >
                      {pt ? "Revisar aula" : "Review lesson"} →
                    </ActionLink>
                  </Card>
                );
              })}
          </div>
        </section>
      ))}
      <div className="fp-actions">
        <ActionLink variant="secondary" href="/api/progress/export">
          {pt ? "Exportar todos os registros" : "Export all records"}
        </ActionLink>
        <ActionLink variant="secondary" href={`/${locale}/practice`}>
          {pt
            ? "Treino de comandos e exclusão de dados"
            : "Input practice and data deletion"}
        </ActionLink>
      </div>
    </main>
  );
}
