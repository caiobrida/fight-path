import { spawnSync } from "node:child_process";

process.loadEnvFile(".env.local");
const result = spawnSync(
  process.execPath,
  ["node_modules/@playwright/test/cli.js", "test", "--project=auth"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      FIGHTPATH_SITE_TESTS: "1",
      FIGHTPATH_AUTH_TESTS: "1",
    },
  },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
