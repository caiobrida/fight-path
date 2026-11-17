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
  assert.deepEqual(readPending({ getItem: () => saved }, "user_a"), [attempt]);
  assert.deepEqual(readPending(null, "user_a"), []);
  assert.deepEqual(readPending({ getItem: () => "not-json" }, "user_a"), []);
  assert.equal(queueAttempt(Array(pendingLimit).fill(attempt), attempt), null);
  assert.equal(queueAttempt([], attempt)?.length, 1);
  assert.equal(writePending(null, "user_a", [attempt]), false);
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
      "user_a",
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
      "user_a",
      [],
    ),
    true,
  );
  assert.deepEqual(writes, [pendingKey("user_a")]);
});

test("pending attempts stay separate across accounts", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
  assert.equal(writePending(storage, "user_a", [attempt]), true);
  assert.deepEqual(readPending(storage, "user_a"), [attempt]);
  assert.deepEqual(readPending(storage, "user_b"), []);
});
