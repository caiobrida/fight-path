import { footsiesLessons } from "./footsies";
import { sf6Lessons } from "./sf6";
import { kenLessons } from "./ken";
import { habitLessons } from "./habits";
import { foundationsLessons } from "./foundations";
import { baseLessons, type Lesson } from "./learning";

export const lessons: readonly Lesson[] = [
  ...baseLessons,
  ...foundationsLessons,
  ...footsiesLessons,
  ...sf6Lessons,
  ...kenLessons,
  ...habitLessons,
];
export const publishedLessons = lessons.filter(
  (lesson) =>
    lesson.status === "published" && lesson.patch?.review !== "pending",
);
export function findLesson(id: string) {
  return publishedLessons.find((lesson) => lesson.id === id);
}
