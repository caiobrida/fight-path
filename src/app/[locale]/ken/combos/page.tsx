import { notFound } from "next/navigation";
import {
  filterCombos,
  kenCombos,
  situationNames,
  type ComboSituation,
} from "@/content/combos";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge, Button, Card, EmptyState } from "@/components/ui";

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
    typeof query[name] === "string" ? (query[name] as string) : "";
  const recipes = filterCombos(kenCombos, {
    situation: value("situation"),
    difficulty: value("difficulty"),
    position: value("position"),
    resource: value("resource"),
  });
  return (
    <main className="fp-page">
      <p className="eyebrow">STREET FIGHTER 6 / KEN CLASSIC</p>
      <h1>{pt ? "BnBs para levar ao treino" : "BnBs to take into training"}</h1>
      <p>
        {pt
          ? "Uma biblioteca de rotas por situação. A execução é praticada no SF6; um comando aceito no navegador não valida um combo."
          : "A route library organized by situation. Execution is practiced in SF6; an accepted browser input does not validate a combo."}
      </p>
      <form className="fp-combo-filters">
        <label>
          {pt ? "Situação" : "Situation"}
          <select name="situation" defaultValue={value("situation")}>
            <option value="">{pt ? "Todas" : "All"}</option>
            {Object.entries(situationNames[locale]).map(([id, label]) => (
              <option value={id} key={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {pt ? "Dificuldade" : "Difficulty"}
          <select name="difficulty" defaultValue={value("difficulty")}>
            <option value="">{pt ? "Todas" : "All"}</option>
            <option value="easy">{pt ? "Inicial" : "Starter"}</option>
            <option value="medium">
              {pt ? "Intermediária" : "Intermediate"}
            </option>
          </select>
        </label>
        <label>
          {pt ? "Posição" : "Position"}
          <select name="position" defaultValue={value("position")}>
            <option value="">{pt ? "Todas" : "All"}</option>
            <option value="anywhere">
              {pt ? "Qualquer posição" : "Anywhere"}
            </option>
            <option value="corner">{pt ? "Canto" : "Corner"}</option>
          </select>
        </label>
        <label>
          {pt ? "Recursos" : "Resources"}
          <select name="resource" defaultValue={value("resource")}>
            <option value="">{pt ? "Todos" : "All"}</option>
            <option value="meterless">{pt ? "Sem gasto" : "Meterless"}</option>
            <option value="spend">{pt ? "Com gasto" : "Resource spend"}</option>
          </select>
        </label>
        <Button type="submit">{pt ? "Filtrar" : "Filter"}</Button>
        <ActionLink variant="quiet" href={`/${locale}/ken/combos`}>
          {pt ? "Limpar filtros" : "Clear filters"}
        </ActionLink>
      </form>
      <div className="fp-card-grid">
        {recipes.map((recipe) => (
          <Card key={recipe.lesson.id}>
            <Badge>{situationNames[locale][recipe.situation]}</Badge>
            <h2>{recipe.lesson.copy[locale].title}</h2>
            <p>{recipe.lesson.copy[locale].summary}</p>
            <p>
              Drive: {recipe.drive} · Super: {recipe.super}
            </p>
            <ActionLink href={`/${locale}/ken/combos/${recipe.lesson.id}`}>
              {pt ? "Ver rota e exercício" : "See route and drill"} →
            </ActionLink>
          </Card>
        ))}
      </div>
      {!recipes.length && (
        <EmptyState
          title={
            pt
              ? "Nenhuma rota verificada neste filtro"
              : "No verified route matches this filter"
          }
        >
          {pt
            ? "As primeiras seis situações estão em revisão de execução no jogo. As rotas só aparecem aqui após validação da versão, condições e demonstração dos dois lados. Você já pode estudar o plano de Ken e praticar comandos individuais."
            : "The first six situations are awaiting in-game execution review. Routes appear here after build, conditions and both-side demonstrations are verified. You can already study Ken's game plan and practice individual inputs."}
        </EmptyState>
      )}
      <section>
        <h2>{pt ? "Situações em preparação" : "Situations under review"}</h2>
        <div className="fp-card-grid">
          {(Object.keys(situationNames[locale]) as ComboSituation[]).map(
            (id) => (
              <Card key={id}>
                <Badge tone="muted">
                  {pt ? "Validação pendente" : "Verification pending"}
                </Badge>
                <h3>{situationNames[locale][id]}</h3>
              </Card>
            ),
          )}
        </div>
      </section>
      <div className="fp-actions">
        <ActionLink href={`/${locale}/learn/ken-start-small`}>
          {pt ? "Estudar o plano de Ken" : "Study Ken's game plan"}
        </ActionLink>
        <ActionLink variant="secondary" href={`/${locale}/practice`}>
          {pt ? "Praticar inputs" : "Practice inputs"}
        </ActionLink>
      </div>
      <p>
        <a
          href="https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos"
          target="_blank"
          rel="noreferrer"
        >
          {pt
            ? "Consultar a referência do SuperCombo"
            : "Consult the SuperCombo reference"}
        </a>
      </p>
    </main>
  );
}
