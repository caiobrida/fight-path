import { foundationsLessons } from "./foundations";
import { baseLessons, type Lesson } from "./learning";

export const lessons: readonly Lesson[] = [
  ...baseLessons,
  ...foundationsLessons,
];
export const publishedLessons = lessons.filter(
  (lesson) => lesson.status === "published",
);
export function findLesson(id: string) {
  return publishedLessons.find((lesson) => lesson.id === id);
}
