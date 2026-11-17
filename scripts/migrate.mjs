import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

const client = new Client({ connectionString: databaseUrl });
const migrationUrl = new URL(
  "../db/migrations/001_initial.sql",
  import.meta.url,
);
const migration = await readFile(fileURLToPath(migrationUrl), "utf8");
let transactionStarted = false;

try {
  await client.connect();
  await client.query("BEGIN");
  transactionStarted = true;
  await client.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
  );
  const applied = await client.query(
    "SELECT 1 FROM schema_migrations WHERE version = $1",
    ["001_initial"],
  );
  if (applied.rowCount === 0) {
    await client.query(migration);
    await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [
      "001_initial",
    ]);
  }
  await client.query("COMMIT");
  process.stdout.write("Database migrations are current.\n");
} catch (error) {
  if (transactionStarted) await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
