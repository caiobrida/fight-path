import { exercises, kenExercises } from "@/content/exercises";

export const exerciseIds = new Set(
  [...exercises, ...kenExercises].map((exercise) => exercise.command.id),
);

export type AttemptInput = Readonly<{
  id: string;
  exerciseId: string;
  correct: boolean;
  durationMs: number;
}>;

export type ProgressRow = Readonly<{
  exerciseId: string;
  attempts: number;
  correct: number;
}>;

export function parseAttempt(value: unknown): AttemptInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (
    typeof input.id !== "string" ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(
      input.id,
    ) ||
    typeof input.exerciseId !== "string" ||
    !exerciseIds.has(input.exerciseId) ||
    typeof input.correct !== "boolean" ||
    typeof input.durationMs !== "number" ||
    !Number.isInteger(input.durationMs) ||
    input.durationMs < 0 ||
    input.durationMs > 120000
  )
    return null;
  return {
    id: input.id,
    exerciseId: input.exerciseId,
    correct: input.correct,
    durationMs: input.durationMs,
  };
}

export function progressById(rows: readonly ProgressRow[]) {
  return Object.fromEntries(
    rows.map((row) => [
      row.exerciseId,
      { attempts: row.attempts, correct: row.correct },
    ]),
  );
}
