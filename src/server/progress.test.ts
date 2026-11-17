import assert from "node:assert/strict";
import test from "node:test";
import { kenExercises } from "@/content/exercises";
import { parseAttempt } from "@/domain/progress";

test("attempt inputs accept only known exercises and bounded metrics", () => {
  const exerciseId = kenExercises[0].command.id;
  const id = "b14f1410-aef0-4fa0-aacf-404a1eccb33d";
  assert.deepEqual(
    parseAttempt({ id, exerciseId, correct: true, durationMs: 300 }),
    {
      id,
      exerciseId,
      correct: true,
      durationMs: 300,
    },
  );
  assert.equal(
    parseAttempt({
      id,
      exerciseId: "another-game",
      correct: true,
      durationMs: 1,
    }),
    null,
  );
  assert.equal(
    parseAttempt({ id, exerciseId, correct: "yes", durationMs: 1 }),
    null,
  );
  assert.equal(
    parseAttempt({ id, exerciseId, correct: true, durationMs: -1 }),
    null,
  );
  assert.equal(
    parseAttempt({ id, exerciseId, correct: true, durationMs: 1.5 }),
    null,
  );
});
