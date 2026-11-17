import tables from "./data/ken-supercombo.json";
import type { ComboCategory, ComboRecipe } from "./combos";
import type { LessonCopy } from "./learning";
import type { Locale } from "@/i18n/dictionaries";

export const supercomboKenUrl =
  "https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos";
export const supercomboAccessed = "2026-11-17";

function resource(value: string): ComboRecipe["drive"] {
  if (!/^[\d\s/()]+$/.test(value)) return null;
  const values = [...new Set((value.match(/\d+/g) ?? []).map(Number))];
  return values.length === 1 ? values[0] : values.length ? values : null;
}

function routeId(notation: string) {
  let hash = 2166136261;
  for (const token of notation)
    hash = Math.imul(hash ^ token.charCodeAt(0), 16777619) >>> 0;
  return `ken-sc-${hash.toString(36)}`;
}

function categories(
  section: string,
  tab: string,
  title: string,
  notation: string,
  drive: ComboRecipe["drive"],
  superCost: ComboRecipe["super"],
): ComboCategory[] {
  const result = new Set<ComboCategory>();
  if (section === "Starter_Combos") result.add("starter");
  if (
    title === "Normal Hit" ||
    (section === "Starter_Combos" && !notation.startsWith("PC "))
  )
    result.add("normal-hit");
  if (title === "Counter Hit" || /\bCH\b/.test(notation))
    result.add("counter-hit");
  if (title === "Punish Counter" || /\bPC\b/.test(notation))
    result.add("punish-counter");
  if (section === "Drive_Rush_Combos" || /\b(?:DRC|PDR)\b/.test(notation))
    result.add("drive-rush");
  if (/\bDI\b/.test(notation)) result.add("drive-impact");
  if (tab === "tabber-Wall_Splat") result.add("wall-splat");
  if (tab === "tabber-Stun") result.add("stun");
  if (
    section === "Super_Art_Combos" ||
    (typeof superCost === "number" && superCost > 0) ||
    Array.isArray(superCost)
  )
    result.add("super");
  if (section === "Max_Damage_Punishes") result.add("optimized");
  if (result.has("normal-hit") && drive === 0 && superCost === 0)
    result.add("normal-meterless");
  return [...result];
}

function copy(locale: Locale, starter: string, template: boolean): LessonCopy {
  const pt = locale === "pt-BR";
  return {
    title: pt ? `Ken · início ${starter}` : `Ken · ${starter} starter`,
    summary: pt
      ? "Uma rota da SuperCombo para escolher, entender e levar ao treino."
      : "A SuperCombo route to choose, understand and take into training.",
    objective: pt
      ? "Ler a notação e identificar a abertura, a posição e os recursos antes de executar."
      : "Read the notation and identify the opening, position and resources before executing.",
    paragraphs: [
      pt
        ? "Esta referência segue a tabela da SuperCombo, com suas alternativas e condições de entrada. A posição está indicada nos dados da rota."
        : "This reference follows the SuperCombo table, including alternatives and entry conditions. The route metadata identifies its position.",
    ],
    example: pt
      ? `Comece pelo trecho ${starter} e siga a ordem mostrada. Confira a situação e a posição antes de escolher a rota.`
      : `Start with ${starter} and follow the displayed order. Check the situation and position before choosing the route.`,
    mistake: template
      ? pt
        ? "Tratar uma continuação indicada por reticências ou um golpe genérico como uma sequência completa. Siga a referência da seção para escolher o trecho restante."
        : "Treating an ellipsis or generic starter as a complete sequence. Follow the source section to choose the remaining part."
      : pt
        ? "Misturar finais separados por / ou ignorar CH, PC, os parênteses e os atrasos indicados na notação."
        : "Combining endings separated by / or overlooking CH, PC, parentheses and the delays marked in the notation.",
    drill: pt
      ? "Escolha uma única alternativa, configure a posição e a condição de acerto indicadas e pratique um trecho por vez no SF6. Junte os trechos e repita do outro lado."
      : "Choose one alternative, set the listed position and hit condition, and practice one segment at a time in SF6. Join the segments and repeat on the other side.",
    check: {
      question: pt
        ? "O que significa / entre finais nesta referência?"
        : "What does / between endings mean in this reference?",
      options: pt
        ? [
            "Alternativas: escolha um final",
            "Execute todos os finais em sequência",
            "Pressione todos os ataques juntos",
          ]
        : [
            "Alternatives: choose one ending",
            "Perform every ending in sequence",
            "Press all attacks together",
          ],
      answer: 0,
      explanation: pt
        ? "A barra separa alternativas. Respeite os agrupamentos e as notas da fonte ao escolher uma delas."
        : "The slash separates alternatives. Respect the groups and source notes when choosing one.",
    },
  };
}

function buildRecipes(): ComboRecipe[] {
  const byNotation = new Map<string, ComboRecipe>();
  tables.forEach((group, groupIndex) =>
    group.rows.forEach((row, rowIndex) => {
      const [
        original,
        sourcePosition,
        sourceDamage,
        driveValue,
        superValue,
        difficulty,
      ] = row;
      const notation = original
        .replace(/^-\s*/, "")
        .replace(/\*.*$/, "")
        .trim();
      const drive = resource(driveValue);
      const superCost = resource(superValue);
      const tags = categories(
        group.section,
        group.tab,
        group.title,
        notation,
        drive,
        superCost,
      );
      const sourceRow = `${groupIndex + 1}:${rowIndex + 1}`;
      const previous = byNotation.get(notation);
      if (previous) {
        previous.categories = [
          ...new Set([...(previous.categories ?? []), ...tags]),
        ];
        previous.evidence.sourceRows = [
          ...(previous.evidence.sourceRows ?? []),
          sourceRow,
        ];
        if (JSON.stringify(previous.drive) !== JSON.stringify(drive)) {
          previous.drive = null;
          previous.sourceCaveat = true;
          previous.categories = previous.categories.filter(
            (tag) => tag !== "normal-meterless",
          );
        }
        if (JSON.stringify(previous.super) !== JSON.stringify(superCost)) {
          previous.super = null;
          previous.sourceCaveat = true;
        }
        return;
      }
      const template =
        notation.includes("...") || notation.includes("Any Cancellable");
      const starter =
        notation.match(/(?:[1-9]+)?(?:LP|MP|HP|LK|MK|HK|KK|P|K)\b/)?.[0] ??
        "Ken";
      const id = routeId(notation);
      const source = `${supercomboKenUrl}#${group.section}`;
      byNotation.set(notation, {
        lesson: {
          id,
          revision: 1,
          level: /Hard/.test(difficulty) ? "intermediate" : "beginner",
          track: "ken",
          scope: "ken-classic",
          status: "published",
          reviewed: supercomboAccessed,
          patch: {
            review: "sourced",
            basis:
              "SuperCombo Ken/Combos source tables; owner-approved publication without independent gameplay verification",
          },
          prerequisites: ["read-an-input", "ken-start-small"],
          sources: [
            {
              title: "SuperCombo · Street Fighter 6 / Ken / Combos",
              url: source,
              supports:
                "Source notation, hit situation, position, reported damage, Drive/Super expenditure and difficulty",
            },
          ],
          copy: {
            en: copy("en", starter, template),
            "pt-BR": copy("pt-BR", starter, template),
          },
        },
        situation: tags.includes("super")
          ? "super"
          : tags.includes("drive-impact")
            ? "impact"
            : tags.includes("drive-rush")
              ? "drive"
              : tags.includes("punish-counter")
                ? "punish"
                : tags.includes("counter-hit")
                  ? "counter"
                  : sourcePosition === "Corner"
                    ? "corner"
                    : group.tab === "tabber-Light_Starter" ||
                        /^[25]L[PK]/.test(notation)
                      ? "light"
                      : "normal",
        difficulty: /Very Hard|Hard/.test(difficulty)
          ? "hard"
          : difficulty === "Variable"
            ? "variable"
            : /Medium/.test(difficulty)
              ? "medium"
              : "easy",
        position:
          sourcePosition === "Anywhere"
            ? "anywhere"
            : sourcePosition === "Corner"
              ? "corner"
              : sourcePosition.startsWith("Near Corner")
                ? "near-corner"
                : "specific",
        sourcePosition,
        sourceDifficulty: difficulty,
        drive,
        super: superCost,
        categories: tags,
        notation,
        template,
        sourceCaveat:
          /\*|missing|seem/.test(original + sourceDamage) ||
          sourceDamage === "Anywhere",
        damage: /^[\d\s/()+]+$/.test(sourceDamage) ? sourceDamage : undefined,
        steps: [],
        conditions: {
          en: "Use the hit condition and position shown in the notation and metadata. Delays, optional parts and alternative endings follow the source; its notes contain additional spacing restrictions.",
          "pt-BR":
            "Use a condição de acerto e a posição indicadas na notação e nos dados. Atrasos, trechos opcionais e finais alternativos seguem a fonte; as notas dela detalham restrições adicionais de distância.",
        },
        fallback: {
          en: "Practice the opening segment first, then add one transition at a time. This is a practice method, not a different combo recipe.",
          "pt-BR":
            "Treine primeiro o início e acrescente uma transição por vez. Isso é uma forma de estudar, não outra receita de combo.",
        },
        evidence: {
          kind: "community-source",
          sourceUrl: supercomboKenUrl,
          sourceSection: group.section,
          sourceRows: [sourceRow],
          build: "",
          reviewed: supercomboAccessed,
          rightClip: "",
          leftClip: "",
          captions: { en: "", "pt-BR": "" },
        },
      });
    }),
  );
  return [...byNotation.values()];
}

export const sourceKenCombos = buildRecipes();

export function positionLabel(
  recipe: Pick<ComboRecipe, "sourcePosition" | "position">,
  locale: Locale,
) {
  const value = recipe.sourcePosition ?? recipe.position;
  if (locale === "en")
    return value === "Near CornerCorner" || value === "NearCornerCorner"
      ? "Near corner / corner"
      : value;
  const labels: Record<string, string> = {
    Anywhere: "Qualquer posição",
    Corner: "Canto",
    "Near Corner": "Próximo ao canto",
    "Near Corner or Corner": "Próximo ao canto ou no canto",
    NearCornerCorner: "Próximo ao canto ou no canto",
    "Near CornerCorner": "Próximo ao canto ou no canto",
    anywhere: "Qualquer posição",
    corner: "Canto",
  };
  return (
    labels[value] ??
    value
      .replace("of the stage from the corner", "do cenário a partir do canto")
      .replace("of the stage from a corner", "do cenário a partir de um canto")
  );
}
