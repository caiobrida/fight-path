import type { CommandDefinition } from "@/domain/evaluator";

export const starterExercise: CommandDefinition = {
  id: "universal-quarter-circle-forward-punch",
  directions: ["down", "down-right", "right"],
  attacks: ["LP", "MP", "HP"],
  maxDurationMs: 1200,
  maxGapMs: 600,
};
