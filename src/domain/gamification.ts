import { exercises, kenExercises } from "@/content/exercises";
import type { ProgressRow } from "./progress";

export type Mastery = "starting" | "building" | "confident";

export type Mission = Readonly<{
  id: "first-motion" | "universal-foundation" | "ken-foundation";
  current: number;
  goal: number;
  complete: boolean;
}>;

export function mastery(row: ProgressRow | undefined): Mastery {
  if (!row || row.recentAttempts === 0) return "starting";
  const accuracy = row.recentCorrect / row.recentAttempts;
  if (row.correct >= 10 && row.recentAttempts >= 10 && accuracy >= 0.7)
    return "confident";
  if (row.correct >= 3 && row.recentAttempts >= 3 && accuracy >= 0.5)
    return "building";
  return "starting";
}

export function gamification(rows: readonly ProgressRow[]) {
  const byId = Object.fromEntries(rows.map((row) => [row.exerciseId, row]));
  const all = [...exercises, ...kenExercises];
  const xp = all.reduce(
    (total, exercise) =>
      total + Math.min(byId[exercise.command.id]?.correct ?? 0, 10) * 10,
    0,
  );
  const count = (ids: readonly string[]) =>
    ids.reduce((total, id) => total + Math.min(byId[id]?.correct ?? 0, 3), 0);
  const missions: Mission[] = [
    {
      id: "first-motion",
      current: Math.min(byId[exercises[0].command.id]?.correct ?? 0, 3),
      goal: 3,
      complete: (byId[exercises[0].command.id]?.correct ?? 0) >= 3,
    },
    {
      id: "universal-foundation",
      current: count(exercises.map((exercise) => exercise.command.id)),
      goal: exercises.length * 3,
      complete: exercises.every(
        (exercise) => (byId[exercise.command.id]?.correct ?? 0) >= 3,
      ),
    },
    {
      id: "ken-foundation",
      current: count(kenExercises.map((exercise) => exercise.command.id)),
      goal: kenExercises.length * 3,
      complete: kenExercises.every(
        (exercise) => (byId[exercise.command.id]?.correct ?? 0) >= 3,
      ),
    },
  ];
  return { xp, level: Math.floor(xp / 100) + 1, missions };
}
