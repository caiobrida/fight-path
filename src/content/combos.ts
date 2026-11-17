import type { Locale } from "@/i18n/dictionaries";
import type { Lesson } from "./learning";

export type ComboSituation =
  "light" | "punish" | "jump" | "drive" | "corner" | "super";
export type ComboRecipe = {
  lesson: Lesson;
  situation: ComboSituation;
  difficulty: "easy" | "medium";
  position: "anywhere" | "corner";
  drive: number;
  super: number;
  steps: {
    directions: string;
    attack: string;
    transition: "start" | "chain" | "link" | "cancel" | "followup";
  }[];
  conditions: Record<Locale, string>;
  fallback: Record<Locale, string>;
  evidence: {
    build: string;
    reviewed: string;
    rightClip: string;
    leftClip: string;
    captions: Record<Locale, string>;
  };
};

export const situationNames: Record<Locale, Record<ComboSituation, string>> = {
  en: {
    light: "Close light starter",
    punish: "Large punish",
    jump: "Jump-in",
    drive: "Grounded Drive Rush",
    corner: "Corner conversion",
    super: "Super finish",
  },
  "pt-BR": {
    light: "Início com golpe leve",
    punish: "Punição grande",
    jump: "Entrada pelo salto",
    drive: "Drive Rush no chão",
    corner: "Conversão no canto",
    super: "Finalização com Super",
  },
};

export const kenCombos: readonly ComboRecipe[] = [];

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

export const publishedCombos = verifiedCombos(kenCombos);

export function filterCombos(
  recipes: readonly ComboRecipe[],
  filters: {
    situation?: string;
    difficulty?: string;
    position?: string;
    resource?: string;
  },
) {
  return verifiedCombos(recipes).filter(
    (recipe) =>
      (!filters.situation || recipe.situation === filters.situation) &&
      (!filters.difficulty || recipe.difficulty === filters.difficulty) &&
      (!filters.position || recipe.position === filters.position) &&
      (!filters.resource ||
        (filters.resource === "meterless"
          ? recipe.drive === 0 && recipe.super === 0
          : recipe.drive > 0 || recipe.super > 0)),
  );
}

export function facingNotation(directions: string, facing: "left" | "right") {
  const mirror: Record<string, string> = {
    "1": "3",
    "3": "1",
    "4": "6",
    "6": "4",
    "7": "9",
    "9": "7",
  };
  return facing === "right"
    ? directions
    : [...directions].map((token) => mirror[token] ?? token).join("");
}
