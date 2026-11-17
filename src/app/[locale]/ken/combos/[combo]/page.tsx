import { notFound } from "next/navigation";
import { publishedCombos } from "@/content/combos";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Notice } from "@/components/ui";
import { ComboSteps } from "@/components/combo-steps";
import { LessonActivity } from "@/components/lesson-activity";

export default async function ComboPage({
  params,
}: {
  params: Promise<{ locale: string; combo: string }>;
}) {
  const { locale, combo } = await params;
  if (!isLocale(locale)) notFound();
  const recipe = publishedCombos.find((item) => item.lesson.id === combo);
  if (!recipe) notFound();
  const text = recipe.lesson.copy[locale];
  const pt = locale === "pt-BR";
  return (
    <main className="fp-page fp-lesson">
      <ActionLink variant="quiet" href={`/${locale}/ken/combos`}>
        {pt ? "Voltar aos BnBs" : "Back to BnBs"}
      </ActionLink>
      <h1>{text.title}</h1>
      <p>{text.summary}</p>
      <Notice>
        {pt
          ? "Referência para praticar no SF6. Sem validação automática de combo no navegador."
          : "Reference for practicing in SF6. No automatic browser combo validation."}
      </Notice>
      <h2>{pt ? "Condições do treino" : "Training conditions"}</h2>
      <p>{recipe.conditions[locale]}</p>
      <p>
        Drive: {recipe.drive} · Super: {recipe.super} · Build:{" "}
        {recipe.evidence.build}
      </p>
      <ComboSteps recipe={recipe} locale={locale} />
      <h2>{pt ? "Se estiver errando" : "If it keeps dropping"}</h2>
      <p>{text.mistake}</p>
      <p>{recipe.fallback[locale]}</p>
      <h2>{pt ? "Exercício no jogo" : "In-game drill"}</h2>
      <p>{text.drill}</p>
      <LessonActivity lesson={recipe.lesson} locale={locale} />
      <section className="fp-sources">
        <h2>{pt ? "Fontes e revisão" : "Sources and review"}</h2>
        <p>{recipe.evidence.reviewed}</p>
        {recipe.lesson.sources.map((source) => (
          <p key={source.url}>
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.title}
            </a>
          </p>
        ))}
      </section>
    </main>
  );
}
