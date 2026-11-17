import { notFound } from "next/navigation";
import {
  categoryNames,
  filterCombos,
  publishedCombos,
  type ComboCategory,
} from "@/content/combos";
import { positionLabel, supercomboKenUrl } from "@/content/ken-combos";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge, Button, Card, EmptyState } from "@/components/ui";
import { FighterArt } from "@/components/fighter-art";
import { ResourceMeter } from "@/components/resource-meter";
import { ComboNotation } from "@/components/combo-notation";

export default async function ComboLibraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pt = locale === "pt-BR";
  const query = await searchParams;
  const value = (name: string) =>
    typeof query[name] === "string"
      ? (query[name] as string).slice(0, 150)
      : "";
  const filters = {
    category: value("category"),
    difficulty: value("difficulty"),
    position: value("position"),
    resource: value("resource"),
    search: value("search"),
    kind: value("kind"),
  };
  const recipes = filterCombos(publishedCombos, filters);
  const totalPages = Math.max(1, Math.ceil(recipes.length / 24));
  const page = Math.min(
    totalPages,
    Math.max(1, Number.parseInt(value("page"), 10) || 1),
  );
  const visible = recipes.slice((page - 1) * 24, page * 24);
  const href = (changes: Record<string, string>) => {
    const next = new URLSearchParams({ ...filters, ...changes });
    for (const [key, v] of [...next]) if (!v) next.delete(key);
    return `/${locale}/ken/combos${next.size ? `?${next}` : ""}`;
  };
  const difficulties = pt
    ? {
        easy: "Inicial",
        medium: "Intermediária",
        hard: "Avançada",
        variable: "Variável",
      }
    : {
        easy: "Starter",
        medium: "Intermediate",
        hard: "Advanced",
        variable: "Variable",
      };
  return (
    <main className="fp-page fp-combo-library">
      <header className="fp-combo-hero">
        <div>
          <p className="eyebrow">STREET FIGHTER 6 / KEN CLASSIC</p>
          <h1>
            {pt
              ? "Uma abertura.\nUm combo na mão."
              : "An opening.\nA combo ready."}
          </h1>
          <p>
            {pt
              ? "Encontre uma rota para cada situação. Compare o gasto de Drive e Super, escolha o final e leve para o treino."
              : "Find a route for each situation. Compare Drive and Super expenditure, choose an ending and take it into training."}
          </p>
          <div className="fp-actions">
            <Badge>
              {publishedCombos.length}{" "}
              {pt ? "rotas e modelos" : "routes and templates"}
            </Badge>
            <a href={supercomboKenUrl} target="_blank" rel="noreferrer">
              {pt ? "Fonte: SuperCombo" : "Source: SuperCombo"} ↗
            </a>
          </div>
        </div>
        <FighterArt character="ken" locale={locale} priority />
      </header>
      <nav
        className="fp-combo-categories"
        aria-label={pt ? "Categorias de combo" : "Combo categories"}
      >
        <a
          href={href({ category: "", page: "" })}
          aria-current={!filters.category ? "page" : undefined}
        >
          {pt ? "Todas" : "All"}
          <span>{publishedCombos.length}</span>
        </a>
        {(
          Object.entries(categoryNames[locale]) as [ComboCategory, string][]
        ).map(([id, label]) => (
          <a
            key={id}
            href={href({ category: id, page: "" })}
            aria-current={filters.category === id ? "page" : undefined}
          >
            {label}
            <span>
              {
                publishedCombos.filter((recipe) =>
                  recipe.categories?.includes(id),
                ).length
              }
            </span>
          </a>
        ))}
      </nav>
      <form
        className="fp-combo-search"
        role="search"
        aria-label={pt ? "Filtrar combos" : "Filter combos"}
      >
        <input type="hidden" name="category" value={filters.category} />
        <label className="fp-combo-search__query">
          {pt ? "Buscar por input ou início" : "Search input or starter"}
          <input
            name="search"
            type="search"
            defaultValue={filters.search}
            placeholder="2LP, 5HP, DRC, 236236P…"
            maxLength={150}
          />
        </label>
        <label>
          {pt ? "Dificuldade" : "Difficulty"}
          <select name="difficulty" defaultValue={filters.difficulty}>
            <option value="">{pt ? "Todas" : "All"}</option>
            {Object.entries(difficulties).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {pt ? "Posição" : "Position"}
          <select name="position" defaultValue={filters.position}>
            <option value="">{pt ? "Todas" : "All"}</option>
            <option value="anywhere">
              {pt ? "Qualquer posição" : "Anywhere"}
            </option>
            <option value="corner">{pt ? "Canto" : "Corner"}</option>
            <option value="near-corner">
              {pt ? "Próximo ao canto / canto" : "Near corner / corner"}
            </option>
            <option value="specific">
              {pt ? "Distância específica" : "Specific spacing"}
            </option>
          </select>
        </label>
        <label>
          {pt ? "Recursos" : "Resources"}
          <select name="resource" defaultValue={filters.resource}>
            <option value="">{pt ? "Todos" : "All"}</option>
            <option value="meterless">{pt ? "Sem gasto" : "Meterless"}</option>
            <option value="spend">{pt ? "Com gasto" : "Resource spend"}</option>
            <option value="unknown">
              {pt ? "Valor a consultar" : "Check source value"}
            </option>
          </select>
        </label>
        <label>
          {pt ? "Tipo de entrada" : "Entry type"}
          <select name="kind" defaultValue={filters.kind}>
            <option value="">{pt ? "Todos" : "All"}</option>
            <option value="route">{pt ? "Rotas" : "Routes"}</option>
            <option value="template">
              {pt ? "Trechos / modelos" : "Segments / templates"}
            </option>
          </select>
        </label>
        <div className="fp-actions">
          <Button type="submit">{pt ? "Filtrar" : "Filter"}</Button>
          <ActionLink variant="quiet" href={`/${locale}/ken/combos`}>
            {pt ? "Limpar" : "Clear"}
          </ActionLink>
        </div>
      </form>
      <div className="fp-section-heading">
        <h2>
          {filters.category &&
          Object.hasOwn(categoryNames[locale], filters.category)
            ? categoryNames[locale][filters.category as ComboCategory]
            : pt
              ? "Escolha sua próxima rota"
              : "Choose your next route"}
        </h2>
        <p role="status">
          {recipes.length
            ? `${(page - 1) * 24 + 1}–${Math.min(page * 24, recipes.length)} / ${recipes.length}`
            : "0"}{" "}
          {pt ? "resultados" : "results"}
        </p>
      </div>
      <div className="fp-combo-grid">
        {visible.map((recipe) => (
          <Card
            className="fp-combo-card"
            key={recipe.lesson.id}
            data-combo-id={recipe.lesson.id}
          >
            <div className="fp-combo-card__tags">
              {recipe.categories?.slice(0, 2).map((tag) => (
                <Badge key={tag}>{categoryNames[locale][tag]}</Badge>
              ))}
              {recipe.template && (
                <Badge tone="muted">
                  {pt ? "Trecho / modelo" : "Segment / template"}
                </Badge>
              )}
            </div>
            <h3>
              <a href={`/${locale}/ken/combos/${recipe.lesson.id}`}>
                {recipe.lesson.copy[locale].title}
              </a>
            </h3>
            <ComboNotation notation={recipe.notation ?? ""} locale={locale} />
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
                <dt>{pt ? "Dificuldade" : "Difficulty"}</dt>
                <dd>{difficulties[recipe.difficulty]}</dd>
              </div>
              <div>
                <dt>{pt ? "Dano · fonte" : "Damage · source"}</dt>
                <dd>{recipe.damage ?? "—"}</dd>
              </div>
            </dl>
            <ActionLink
              variant="secondary"
              href={`/${locale}/ken/combos/${recipe.lesson.id}`}
            >
              {pt ? "Abrir rota" : "Open route"} →
            </ActionLink>
          </Card>
        ))}
      </div>
      {!recipes.length && (
        <EmptyState
          title={
            pt
              ? "Nenhum combo com esses filtros"
              : "No combos match these filters"
          }
        >
          {pt
            ? "Tente outro início, recurso ou categoria."
            : "Try another starter, resource option or category."}
        </EmptyState>
      )}
      {totalPages > 1 && (
        <nav
          className="fp-combo-pagination"
          aria-label={pt ? "Páginas de combos" : "Combo pages"}
        >
          {page > 1 && (
            <ActionLink
              variant="secondary"
              href={href({ page: String(page - 1) })}
            >
              ← {pt ? "Anterior" : "Previous"}
            </ActionLink>
          )}
          <span>
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <ActionLink href={href({ page: String(page + 1) })}>
              {pt ? "Próxima" : "Next"} →
            </ActionLink>
          )}
        </nav>
      )}
      <p className="fp-art-credit">
        {pt
          ? "Notação e valores reportados pela SuperCombo. Barras listradas indicam gasto variável entre alternativas; — indica valor ausente ou divergente. O gasto total não é necessariamente a quantidade exigida no início. As notas completas estão na fonte de cada rota."
          : "Notation and values reported by SuperCombo. Striped bars indicate expenditure that varies between alternatives; — indicates a missing or conflicting value. Total expenditure is not necessarily the gauge required at the start. Full notes are linked from each route."}
      </p>
      <div className="fp-actions">
        <ActionLink href={`/${locale}/learn/ken-start-small`}>
          {pt ? "Plano de jogo de Ken" : "Ken's game plan"}
        </ActionLink>
        <ActionLink variant="secondary" href={`/${locale}/practice`}>
          {pt ? "Praticar inputs" : "Practice inputs"}
        </ActionLink>
      </div>
    </main>
  );
}
