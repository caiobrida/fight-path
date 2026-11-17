import { notFound } from "next/navigation";
import { publishedLessons } from "@/content/catalog";
import { trackNames } from "@/content/learning";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge, Card } from "@/components/ui";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pt = locale === "pt-BR";
  return (
    <main className="fp-page">
      <p className="eyebrow">
        {pt ? "Um caminho para jogar melhor" : "A path to better play"}
      </p>
      <h1>
        {pt
          ? "Aprenda uma habilidade.\nLeve para o próximo round."
          : "Learn a skill.\nTake it into your next round."}
      </h1>
      <p>
        {pt
          ? "Explicações, exemplos e treinos para entender suas decisões. Ler uma aula é diferente de executar um comando ou vencer uma partida."
          : "Explanations, examples and drills to understand your decisions. Reading a lesson is different from executing a command or winning a match."}
      </p>
      {Object.entries(trackNames[locale]).map(([track, title]) => {
        const entries = publishedLessons.filter(
          (lesson) => lesson.track === track,
        );
        if (!entries.length) return null;
        return (
          <section key={track} id={track}>
            <div className="fp-section-heading">
              <h2>{title}</h2>
              <Badge tone="muted">
                {entries.length} {pt ? "aulas" : "lessons"}
              </Badge>
            </div>
            <div className="fp-card-grid">
              {entries.map((lesson) => (
                <Card key={lesson.id}>
                  <Badge>
                    {lesson.scope === "universal"
                      ? pt
                        ? "Conceito geral"
                        : "General concept"
                      : lesson.scope === "sf6"
                        ? "Street Fighter 6"
                        : "Ken Classic"}
                  </Badge>
                  <h3>{lesson.copy[locale].title}</h3>
                  <p>{lesson.copy[locale].summary}</p>
                  <ActionLink
                    variant="secondary"
                    href={`/${locale}/learn/${lesson.id}`}
                  >
                    {pt ? "Abrir aula" : "Open lesson"} →
                  </ActionLink>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
      <div className="fp-actions">
        <ActionLink variant="secondary" href={`/${locale}/ken/combos`}>
          {pt ? "BnBs de Ken" : "Ken BnBs"}
        </ActionLink>
        <ActionLink variant="secondary" href={`/${locale}/learn/progress`}>
          {pt ? "Meu aprendizado" : "My learning"}
        </ActionLink>
        <ActionLink href={`/${locale}/practice`}>
          {pt ? "Praticar os comandos" : "Practice inputs"}
        </ActionLink>
      </div>
    </main>
  );
}
