import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(
  new URL("../../scripts/check-release.mjs", import.meta.url),
);

const shared = {
  DATABASE_URL:
    "postgresql://user:pass@ep-example.neon.tech/db?sslmode=require",
  CLERK_WEBHOOK_SIGNING_SECRET: "whsec_example",
  CRON_SECRET: "12345678901234567890123456789012",
  PRIVACY_OPERATOR_NAME: "Example Operator",
  PRIVACY_CONTACT_EMAIL: "operator@example.com",
};

function check(
  environment: "preview" | "production",
  values: Record<string, string>,
) {
  return spawnSync(process.execPath, [script], {
    encoding: "utf8",
    env: {
      SystemRoot: process.env.SystemRoot,
      NODE_ENV: "test",
      VERCEL_ENV: environment,
      ...values,
    },
  });
}

test("Preview accepts development keys without release-only configuration", () => {
  const result = check("preview", {
    DATABASE_URL: shared.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_example",
    CLERK_SECRET_KEY: "sk_test_example",
  });

  assert.equal(result.status, 0, result.stderr);
});

test("Production-labeled development requires its explicit marker and cron secret", () => {
  const keys = {
    DATABASE_URL: shared.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_example",
    CLERK_SECRET_KEY: "sk_test_example",
  };

  const accepted = check("production", {
    ...keys,
    CRON_SECRET: shared.CRON_SECRET,
    FIGHTPATH_RELEASE_MODE: "development",
  });
  const missingCron = check("production", {
    ...keys,
    FIGHTPATH_RELEASE_MODE: "development",
  });
  const missingMarker = check("production", { ...shared, ...keys });

  assert.equal(accepted.status, 0, accepted.stderr);
  assert.match(missingCron.stderr, /CRON_SECRET/);
  assert.match(missingMarker.stderr, /matching Clerk live keys/);
});

test("Public production requires live keys and release configuration", () => {
  const accepted = check("production", {
    ...shared,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_example",
    CLERK_SECRET_KEY: "sk_live_example",
  });
  const missingWebhook = check("production", {
    ...shared,
    CLERK_WEBHOOK_SIGNING_SECRET: "",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_example",
    CLERK_SECRET_KEY: "sk_live_example",
  });

  assert.equal(accepted.status, 0, accepted.stderr);
  assert.match(missingWebhook.stderr, /CLERK_WEBHOOK_SIGNING_SECRET/);
});
