import { spawnSync } from "node:child_process";

const result = spawnSync(
  process.execPath,
  ["node_modules/@playwright/test/cli.js", "test", "--project=site"],
  { stdio: "inherit", env: { ...process.env, FIGHTPATH_SITE_TESTS: "1" } },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
