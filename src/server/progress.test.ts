import assert from "node:assert/strict";
import test from "node:test";
import { kenExercises } from "@/content/exercises";
import { parseAttempt } from "@/domain/progress";
import { newSessionToken, tokenHash, validSessionToken } from "./session-token";

test("session tokens are opaque and stored only as hashes", () => {
  const first = newSessionToken();
  const second = newSessionToken();
  assert.equal(validSessionToken(first), true);
  assert.notEqual(first, second);
  assert.notEqual(tokenHash(first), first);
  assert.notEqual(tokenHash(first), tokenHash(second));
  assert.equal(validSessionToken("invalid"), false);
});

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
