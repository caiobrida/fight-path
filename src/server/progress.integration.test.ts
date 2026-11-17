import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { database } from "./db";

test(
  "attempt summaries are isolated by Clerk user",
  { skip: !process.env.DATABASE_URL },
  async () => {
    const client = await database().connect();
    try {
      await client.query("BEGIN");
      const first = `user_${randomUUID()}`;
      const second = `user_${randomUUID()}`;
      await client.query(
        "INSERT INTO attempts (user_id, exercise_id, correct, duration_ms) VALUES ($1, $2, $3, $4)",
        [first, "ken-classic-hadoken", true, 300],
      );
      const result = await client.query<{ count: number }>(
        "SELECT COUNT(*)::int AS count FROM attempts WHERE user_id = $1",
        [second],
      );
      assert.equal(result.rows[0].count, 0);
    } finally {
      await client.query("ROLLBACK");
      client.release();
      await database().end();
    }
  },
);
