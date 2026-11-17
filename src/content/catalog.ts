import { footsiesLessons } from "./footsies";
import { sf6Lessons } from "./sf6";
import { kenLessons } from "./ken";
import { habitLessons } from "./habits";
import { publishedCombos } from "./combos";
import { essentialLessons } from "./essentials";
import { foundationsLessons } from "./foundations";
import { baseLessons, type Lesson } from "./learning";

export const lessons: readonly Lesson[] = [
  ...baseLessons,
  ...essentialLessons.slice(0, 2),
  ...foundationsLessons,
  ...essentialLessons.slice(2),
  ...footsiesLessons,
  ...sf6Lessons,
  ...kenLessons,
  ...habitLessons,
  ...publishedCombos.map((recipe) => recipe.lesson),
];
export const publishedLessons = lessons.filter(
  (lesson) =>
    lesson.status === "published" && lesson.patch?.review !== "pending",
);
export function findLesson(id: string) {
  return publishedLessons.find((lesson) => lesson.id === id);
}
