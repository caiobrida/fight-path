import assert from "node:assert/strict";
import test from "node:test";
import { lessons, findLesson, publishedLessons } from "./catalog";
import { publishedCombos } from "./combos";
import { validateLessons } from "./learning";

test("published lessons have both translations and reviewable sources", () => {
  assert.deepEqual(validateLessons(lessons), []);
  assert.ok(findLesson("read-an-input"));
  assert.equal(findLesson("unreviewed-draft"), undefined);
  assert.equal(publishedLessons.length, 18);
  assert.ok(findLesson(publishedCombos[0].lesson.id));
  assert.ok(
    !publishedLessons.some(
      (lesson) => lesson.id === publishedCombos[0].lesson.id,
    ),
  );
});

test("invalid review and duplicated IDs fail content validation", () => {
  const changed = { ...lessons[0], sources: [] };
  assert.ok(validateLessons([changed, changed]).length >= 2);
});

test("curriculum review rejects prerequisite cycles and inconsistent answer translations", () => {
  const first = { ...lessons[0], id: "first", prerequisites: ["second"] };
  const second = { ...lessons[0], id: "second", prerequisites: ["first"] };
  assert.ok(
    validateLessons([first, second]).some((error) =>
      error.startsWith("Cyclic prerequisite"),
    ),
  );
  assert.ok(
    validateLessons([
      {
        ...lessons[0],
        copy: {
          ...lessons[0].copy,
          en: {
            ...lessons[0].copy.en,
            check: { ...lessons[0].copy.en.check, answer: 2 },
          },
        },
      },
    ]).some((error) => error.startsWith("Mismatched answer")),
  );
});
