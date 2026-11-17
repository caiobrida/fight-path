import assert from "node:assert/strict";
import test from "node:test";
import {
  pendingKey,
  pendingLimit,
  queueAttempt,
  readPending,
  writePending,
} from "./pending";
import type { AttemptInput } from "./progress";

const attempt: AttemptInput = {
  id: "b14f1410-aef0-4fa0-aacf-404a1eccb33d",
  exerciseId: "ken-classic-hadoken",
  correct: true,
  durationMs: 300,
};

test("pending attempts are validated and bounded", () => {
  const saved = JSON.stringify([
    attempt,
    { ...attempt, exerciseId: "unknown" },
  ]);
  assert.deepEqual(readPending({ getItem: () => saved }), [attempt]);
  assert.deepEqual(readPending(null), []);
  assert.deepEqual(readPending({ getItem: () => "not-json" }), []);
  assert.equal(queueAttempt(Array(pendingLimit).fill(attempt), attempt), null);
  assert.equal(queueAttempt([], attempt)?.length, 1);
  assert.equal(writePending(null, [attempt]), false);
});

test("pending storage failures leave the in-memory queue available", () => {
  assert.equal(
    writePending(
      {
        setItem: () => {
          throw new Error("Quota");
        },
        removeItem: () => {},
      },
      [attempt],
    ),
    false,
  );
  const writes: string[] = [];
  assert.equal(
    writePending(
      {
        setItem: (key) => writes.push(key),
        removeItem: (key) => writes.push(key),
      },
      [],
    ),
    true,
  );
  assert.deepEqual(writes, [pendingKey]);
});
