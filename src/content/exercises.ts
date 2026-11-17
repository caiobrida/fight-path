import type { CommandDefinition } from "@/domain/evaluator";
import type { Locale } from "@/i18n/dictionaries";

export type Exercise = Readonly<{
  command: CommandDefinition;
  title: Record<Locale, string>;
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
