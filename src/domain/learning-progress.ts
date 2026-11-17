import { findLesson } from "@/content/catalog";

export type ActivityKind = "read" | "check" | "drill";
export type LearningActivity = {
  lesson_id: string;
  revision: number;
  kind: ActivityKind;
  created_at: string;
};

export function parseLearningInput(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (typeof value.lessonId !== "string") return null;
  const lesson = findLesson(value.lessonId);
  if (!lesson || value.revision !== lesson.revision) return null;
  if (value.kind !== "read" && value.kind !== "check" && value.kind !== "drill")
    return null;
  if (value.kind === "check" && value.answer !== lesson.copy.en.check.answer)
    return null;
  return {
    lessonId: lesson.id,
    revision: lesson.revision,
    kind: value.kind as ActivityKind,
  };
}

export function currentActivities(
  rows: readonly LearningActivity[],
  lessonId: string,
  revision: number,
) {
  return new Set(
    rows
      .filter((row) => row.lesson_id === lessonId && row.revision === revision)
      .map((row) => row.kind),
  );
}
