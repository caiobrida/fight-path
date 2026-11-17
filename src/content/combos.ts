import type { Locale } from "@/i18n/dictionaries";
import type { Lesson } from "./learning";
import { sourceKenCombos } from "./ken-combos";

export type ComboSituation =
  | "light"
  | "normal"
  | "counter"
  | "impact"
  | "punish"
  | "jump"
  | "drive"
  | "corner"
  | "super";
export type ComboRecipe = {
  lesson: Lesson;
  situation: ComboSituation;
  difficulty: "easy" | "medium" | "hard" | "variable";
  position: "anywhere" | "corner" | "near-corner" | "specific";
  drive: number | readonly number[] | null;
  super: number | readonly number[] | null;
  categories?: readonly ComboCategory[];
  notation?: string;
  sourcePosition?: string;
  sourceDifficulty?: string;
  damage?: string;
  template?: boolean;
  sourceCaveat?: boolean;
  steps: {
    directions: string;
    attack: string;
    transition: "start" | "chain" | "link" | "cancel" | "followup";
  }[];
  conditions: Record<Locale, string>;
  fallback: Record<Locale, string>;
  evidence: {
    kind?: "gameplay" | "community-source";
    sourceUrl?: string;
    sourceSection?: string;
    sourceRows?: readonly string[];
    build: string;
    reviewed: string;
    rightClip: string;
    leftClip: string;
    captions: Record<Locale, string>;
  };
};

export const situationNames: Record<Locale, Record<ComboSituation, string>> = {
  en: {
    normal: "Normal hit",
    counter: "Counter Hit",
    impact: "Drive Impact",
    light: "Close light starter",
    punish: "Large punish",
    jump: "Jump-in",
    drive: "Grounded Drive Rush",
    corner: "Corner conversion",
    super: "Super finish",
  },
  "pt-BR": {
    normal: "Acerto normal",
    counter: "Counter Hit",
    impact: "Drive Impact",
    light: "Início com golpe leve",
    punish: "Punição grande",
    jump: "Entrada pelo salto",
    drive: "Drive Rush no chão",
    corner: "Conversão no canto",
    super: "Finalização com Super",
  },
};

export const kenCombos: readonly ComboRecipe[] = sourceKenCombos;

export function verifiedCombos(recipes: readonly ComboRecipe[]) {
  return recipes.filter(
    (recipe) =>
      recipe.lesson.status === "published" &&
      recipe.lesson.patch?.review === "verified" &&
      recipe.evidence.build &&
      recipe.evidence.rightClip &&
      recipe.evidence.leftClip &&
      recipe.evidence.captions.en &&
      recipe.evidence.captions["pt-BR"],
  );
}

export type ComboCategory =
  | "starter"
  | "normal-meterless"
  | "normal-hit"
  | "counter-hit"
  | "punish-counter"
  | "drive-rush"
  | "drive-impact"
  | "wall-splat"
  | "stun"
  | "super"
  | "optimized";

export const categoryNames: Record<Locale, Record<ComboCategory, string>> = {
  en: {
    starter: "Start here",
    "normal-meterless": "Normal hit · meterless",
    "normal-hit": "Normal hit",
    "counter-hit": "Counter Hit",
    "punish-counter": "Punish Counter",
    "drive-rush": "Drive Rush",
    "drive-impact": "Drive Impact",
    "wall-splat": "Wall splat",
    stun: "Stun",
    super: "Super Arts",
    optimized: "Damage routes",
  },
  "pt-BR": {
    starter: "Comece aqui",
    "normal-meterless": "Acerto normal · sem gasto",
    "normal-hit": "Acerto normal",
    "counter-hit": "Counter Hit",
    "punish-counter": "Punish Counter",
    "drive-rush": "Drive Rush",
    "drive-impact": "Drive Impact",
    "wall-splat": "Impacto na parede",
    stun: "Stun",
    super: "Super Arts",
    optimized: "Rotas de dano",
  },
};

export function publishableCombos(recipes: readonly ComboRecipe[]) {
  const verified = new Set(verifiedCombos(recipes));
  return recipes.filter(
    (recipe) =>
      verified.has(recipe) ||
      (recipe.lesson.status === "published" &&
        recipe.lesson.patch?.review === "sourced" &&
        recipe.evidence.kind === "community-source" &&
        recipe.evidence.sourceUrl ===
          "https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos" &&
        recipe.evidence.reviewed &&
        recipe.notation &&
        recipe.lesson.sources.some((source) =>
          source.url.startsWith(`${recipe.evidence.sourceUrl}#`),
        )),
  );
}

export const publishedCombos = publishableCombos(kenCombos);

export function costValues(cost: ComboRecipe["drive"]): readonly number[] {
  return cost === null ? [] : typeof cost === "number" ? [cost] : cost;
}

export function filterCombos(
  recipes: readonly ComboRecipe[],
  filters: {
    situation?: string;
    difficulty?: string;
    position?: string;
    resource?: string;
    category?: string;
    search?: string;
    kind?: string;
  },
) {
  return publishableCombos(recipes).filter(
    (recipe) =>
      (!filters.situation || recipe.situation === filters.situation) &&
      (!filters.difficulty || recipe.difficulty === filters.difficulty) &&
      (!filters.position || recipe.position === filters.position) &&
      (!filters.category ||
        recipe.categories?.includes(filters.category as ComboCategory)) &&
      (!filters.search ||
        `${recipe.notation} ${recipe.lesson.copy.en.title} ${recipe.lesson.copy["pt-BR"].title}`
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase())) &&
      (!filters.kind ||
        (filters.kind === "template"
          ? recipe.template
          : filters.kind === "route"
            ? !recipe.template
            : false)) &&
      (!filters.resource ||
        (filters.resource === "meterless"
          ? costValues(recipe.drive).length > 0 &&
            costValues(recipe.super).length > 0 &&
            [...costValues(recipe.drive), ...costValues(recipe.super)].every(
              (value) => value === 0,
            )
          : filters.resource === "spend"
            ? [...costValues(recipe.drive), ...costValues(recipe.super)].some(
                (value) => value > 0,
              )
            : filters.resource === "unknown" &&
              (recipe.drive === null || recipe.super === null))),
  );
}

export {
  facingNotation,
  mirrorComboNotation,
  localizedNotation,
} from "@/domain/combo-notation";
