import { globSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (process.env.CI && !process.env.DATABASE_URL)
  throw new Error(
    "CI requires a disposable PostgreSQL DATABASE_URL; integration tests must not be skipped",
  );
const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...globSync("src/**/*.test.ts")],
  { stdio: "inherit" },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
