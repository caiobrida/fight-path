import assert from "node:assert/strict";
import test from "node:test";
import { parseLearningInput, currentActivities } from "./learning-progress";

test("learning writes reject stale revisions, unpublished content and incorrect checks", () => {
  assert.equal(
    parseLearningInput({ lessonId: "missing", revision: 1, kind: "read" }),
    null,
  );
  assert.equal(
    parseLearningInput({
      lessonId: "read-an-input",
      revision: 99,
      kind: "read",
    }),
    null,
  );
  assert.equal(
    parseLearningInput({
      lessonId: "read-an-input",
      revision: 1,
      kind: "check",
      answer: 0,
    }),
    null,
  );
  assert.deepEqual(
    parseLearningInput({
      lessonId: "read-an-input",
      revision: 1,
      kind: "check",
      answer: 1,
      userId: "someone-else",
    }),
    { lessonId: "read-an-input", revision: 1, kind: "check" },
  );
});

test("past lesson revisions never certify updated lessons", () => {
  assert.equal(
    currentActivities(
      [
        {
          lesson_id: "read-an-input",
          revision: 1,
          kind: "read",
          created_at: "2026-11-17",
        },
      ],
      "read-an-input",
      2,
    ).size,
    0,
  );
});
