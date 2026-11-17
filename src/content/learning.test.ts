import assert from "node:assert/strict";
import test from "node:test";
import { lessons, findLesson } from "./catalog";
import { validateLessons } from "./learning";

test("published lessons have both translations and reviewable sources", () => {
  assert.deepEqual(validateLessons(lessons), []);
  assert.ok(findLesson("read-an-input"));
  assert.equal(findLesson("unreviewed-draft"), undefined);
});

test("invalid review and duplicated IDs fail content validation", () => {
  const changed = { ...lessons[0], sources: [] };
  assert.ok(validateLessons([changed, changed]).length >= 2);
});
