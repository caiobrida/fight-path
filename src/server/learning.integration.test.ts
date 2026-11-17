import assert from "node:assert/strict";
import test, { after } from "node:test";
import { randomUUID } from "node:crypto";
import { database } from "./db";
import { deleteUserProgress, readLearning, saveLearning } from "./learning";

after(async () => {
  if (process.env.DATABASE_URL) await database().end();
});

test(
  "learning is account-bound, idempotent and deleted with attempts",
  { skip: !process.env.DATABASE_URL },
  async () => {
    const first = `test_${randomUUID()}`;
    const second = `test_${randomUUID()}`;
    try {
      const activity = {
        lessonId: "read-an-input",
        revision: 1,
        kind: "read" as const,
      };
      await Promise.all([
        saveLearning(first, activity),
        saveLearning(first, activity),
      ]);
      assert.equal((await readLearning(first)).length, 1);
      assert.equal((await readLearning(second)).length, 0);
      await saveLearning(second, activity);
      await database().query(
        "INSERT INTO attempts (user_id, exercise_id, correct, duration_ms) VALUES ($1, $2, true, 100)",
        [first, "ken-classic-hadoken"],
      );
      await deleteUserProgress(first);
      assert.equal((await readLearning(first)).length, 0);
      assert.equal((await readLearning(second)).length, 1);
      const result = await database().query(
        "SELECT 1 FROM attempts WHERE user_id = $1",
        [first],
      );
      assert.equal(result.rowCount, 0);
    } finally {
      await deleteUserProgress(first);
      await deleteUserProgress(second);
    }
  },
);
