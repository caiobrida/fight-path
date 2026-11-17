import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

const client = new Client({ connectionString: databaseUrl });
const migrationsUrl = new URL("../db/migrations/", import.meta.url);
const migrations = (await readdir(fileURLToPath(migrationsUrl)))
  .filter((file) => /^\d+_[a-z_]+\.sql$/.test(file))
  .sort();
let transactionStarted = false;

try {
  await client.connect();
  await client.query("BEGIN");
  transactionStarted = true;
  await client.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
  );
  for (const file of migrations) {
    const version = file.slice(0, -4);
    const applied = await client.query(
      "SELECT 1 FROM schema_migrations WHERE version = $1",
      [version],
    );
    if (applied.rowCount) continue;
    const sql = await readFile(
      fileURLToPath(new URL(file, migrationsUrl)),
      "utf8",
    );
    await client.query(sql);
    await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [
      version,
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
