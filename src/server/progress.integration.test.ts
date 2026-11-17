import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { database } from "./db";

test(
  "attempt summaries are isolated by session",
  { skip: !process.env.DATABASE_URL },
  async () => {
    const client = await database().connect();
    try {
      await client.query("BEGIN");
      const first = await client.query<{ id: string }>(
        "INSERT INTO sessions (token_hash) VALUES ($1) RETURNING id",
        [randomUUID().replaceAll("-", "") + randomUUID().replaceAll("-", "")],
      );
      const second = await client.query<{ id: string }>(
        "INSERT INTO sessions (token_hash) VALUES ($1) RETURNING id",
        [randomUUID().replaceAll("-", "") + randomUUID().replaceAll("-", "")],
      );
      await client.query(
        "INSERT INTO attempts (session_id, exercise_id, correct, duration_ms) VALUES ($1, $2, $3, $4)",
        [first.rows[0].id, "ken-classic-hadoken", true, 300],
      );
      const result = await client.query<{ count: number }>(
        "SELECT COUNT(*)::int AS count FROM attempts WHERE session_id = $1",
        [second.rows[0].id],
      );
      assert.equal(result.rows[0].count, 0);
    } finally {
      await client.query("ROLLBACK");
      client.release();
      await database().end();
    }
  },
);
