import type { CommandDefinition } from "@/domain/evaluator";
import type { Locale } from "@/i18n/dictionaries";

export type Exercise = Readonly<{
  command: CommandDefinition;
  title: Record<Locale, string>;
  description?: Record<Locale, string>;
  source?: Readonly<{
    id: string;
    url: string;
    accessed: string;
    version: string;
  }>;
  goal: number;
}>;

export const exercises: readonly Exercise[] = [
  {
    command: {
      id: "universal-quarter-circle-forward-punch",
      directions: ["down", "down-right", "right"],
      attacks: ["LP", "MP", "HP"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: {
      en: "Quarter circle forward + punch",
      "pt-BR": "Quarto de círculo para frente + soco",
    },
    goal: 10,
  },
  {
    command: {
      id: "universal-quarter-circle-back-punch",
      directions: ["down", "down-left", "left"],
      attacks: ["LP", "MP", "HP"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: {
      en: "Quarter circle back + punch",
      "pt-BR": "Quarto de círculo para trás + soco",
    },
    goal: 10,
  },
  {
    command: {
      id: "universal-forward-down-diagonal-punch",
      directions: ["right", "down", "down-right"],
      attacks: ["LP", "MP", "HP"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: {
      en: "Forward, down, diagonal + punch",
      "pt-BR": "Frente, baixo, diagonal + soco",
    },
    goal: 10,
  },
];

const kenSource = {
  id: "CAPCOM-KEN-MOVES",
  url: "https://www.streetfighter.com/6/character/ken/movelist",
  accessed: "2026-11-17",
  version: "Current web command list; patch number unspecified",
} as const;

export const kenExercises: readonly Exercise[] = [
  {
    command: {
      id: "ken-classic-hadoken",
      directions: ["down", "down-right", "right"],
      attacks: ["LP", "MP", "HP"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: { en: "Hadoken", "pt-BR": "Hadoken" },
    description: {
      en: "Quarter circle forward and punch. Practice the motion from either side.",
      "pt-BR":
        "Quarto de círculo para frente e soco. Pratique o movimento dos dois lados.",
    },
    source: kenSource,
    goal: 10,
  },
  {
    command: {
      id: "ken-classic-shoryuken",
      directions: ["right", "down", "down-right"],
      attacks: ["LP", "MP", "HP"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: { en: "Shoryuken", "pt-BR": "Shoryuken" },
    description: {
      en: "Forward, down, down-forward and punch. Focus on the final diagonal.",
      "pt-BR":
        "Frente, baixo, baixo-frente e soco. Concentre-se na diagonal final.",
    },
    source: kenSource,
    goal: 10,
  },
  {
    command: {
      id: "ken-classic-tatsumaki",
      directions: ["down", "down-left", "left"],
      attacks: ["LK", "MK", "HK"],
      maxDurationMs: 1200,
      maxGapMs: 600,
    },
    title: {
      en: "Tatsumaki Senpu-kyaku",
      "pt-BR": "Tatsumaki Senpu-kyaku",
    },
    description: {
      en: "Quarter circle back and kick. This lesson uses the grounded command.",
      "pt-BR":
        "Quarto de círculo para trás e chute. Esta lição usa o comando no chão.",
    },
    source: kenSource,
    goal: 10,
  },
];
