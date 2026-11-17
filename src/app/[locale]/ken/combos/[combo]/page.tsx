import { notFound } from "next/navigation";
import { categoryNames, publishedCombos } from "@/content/combos";
import { positionLabel } from "@/content/ken-combos";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge } from "@/components/ui";
import { ComboSteps } from "@/components/combo-steps";
import { LessonActivity } from "@/components/lesson-activity";
import { ResourceMeter } from "@/components/resource-meter";
import { GameMedia } from "@/components/game-media";
import type { GameMediaId } from "@/content/game-media";

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
  const notation = recipe.notation ?? "";
  const media: GameMediaId | null = /\bDI\b/.test(notation)
    ? "ken-drive-impact"
    : /623(?:P|LP|MP|HP)/.test(notation)
      ? "ken-shoryuken"
      : /214(?:K|LK|MK|HK)/.test(notation)
        ? "ken-tatsumaki"
        : /5MP\s*~\s*5HP/.test(notation)
          ? "ken-chin-buster"
          : null;
  return (
    <main className="fp-page fp-lesson fp-combo-detail">
      <ActionLink variant="quiet" href={`/${locale}/ken/combos`}>
        ← {pt ? "Voltar aos combos" : "Back to combos"}
      </ActionLink>
      <p className="eyebrow">KEN CLASSIC / SUPERCOMBO</p>
      <h1>{text.title}</h1>
      <p>{text.summary}</p>
      <div className="fp-combo-card__tags">
        {recipe.categories?.map((tag) => (
          <Badge key={tag}>{categoryNames[locale][tag]}</Badge>
        ))}
      </div>
      <div className="fp-combo-costs">
        <ResourceMeter kind="drive" cost={recipe.drive} locale={locale} />
        <ResourceMeter kind="super" cost={recipe.super} locale={locale} />
      </div>
      <dl className="fp-combo-meta">
        <div>
          <dt>{pt ? "Posição" : "Position"}</dt>
          <dd>{positionLabel(recipe, locale)}</dd>
        </div>
        <div>
          <dt>{pt ? "Dano · fonte" : "Damage · source"}</dt>
          <dd>{recipe.damage ?? "—"}</dd>
        </div>
        <div>
          <dt>{pt ? "Importado em" : "Imported"}</dt>
          <dd>{recipe.evidence.reviewed}</dd>
        </div>
      </dl>
      <ComboSteps recipe={recipe} locale={locale} />
      <section>
        <h2>{pt ? "Como usar esta rota" : "Using this route"}</h2>
        <p>{recipe.conditions[locale]}</p>
        <p>
          {pt
            ? "Os gastos indicados vêm da SuperCombo; alternativas podem usar quantidades diferentes. O total não representa necessariamente a quantidade que precisa estar cheia no início. — indica um valor ausente ou divergente na fonte."
            : "Listed expenditure comes from SuperCombo; alternatives may spend different amounts. The total is not necessarily the gauge required at the start. — indicates a missing or conflicting source value."}
        </p>
      </section>
      <section>
        <h2>{pt ? "Ao praticar" : "While practicing"}</h2>
        <p>{text.mistake}</p>
        <p>{recipe.fallback[locale]}</p>
        <p>{text.drill}</p>
      </section>
      {media && (
        <section>
          <h2>{pt ? "Um golpe desta rota" : "A move from this route"}</h2>
          <p className="fp-art-credit">
            {pt
              ? "Demonstração oficial do golpe isolado, não do combo completo."
              : "Official demonstration of an isolated move, not the complete combo."}
          </p>
          <GameMedia media={media} locale={locale} />
        </section>
      )}
      <LessonActivity lesson={recipe.lesson} locale={locale} />
      <section className="fp-sources">
        <h2>{pt ? "Fonte desta rota" : "Route source"}</h2>
        {recipe.lesson.sources.map((source) => (
          <p key={source.url}>
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.title} ↗
            </a>
          </p>
        ))}
        <p className="fp-art-credit">
          {pt
            ? "Referência da comunidade, publicada a partir da SuperCombo. Não representa validação automática do combo pelo navegador."
            : "Community reference published from SuperCombo. This does not represent automatic browser combo validation."}
        </p>
      </section>
    </main>
  );
}
