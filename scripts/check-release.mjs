const environment = process.env.VERCEL_ENV;
if (environment !== "preview" && environment !== "production") process.exit(0);

const required = [
  "DATABASE_URL",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "CLERK_WEBHOOK_SIGNING_SECRET",
  "CRON_SECRET",
  "PRIVACY_OPERATOR_NAME",
  "PRIVACY_CONTACT_EMAIL",
];
const missing = required.filter((name) => {
  const value = process.env[name]?.trim();
  return !value || value.startsWith("replace-with-");
});
if (missing.length)
  throw new Error(`Missing deployment configuration: ${missing.join(", ")}`);

if (
  environment === "production" &&
  (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") ||
    process.env.CLERK_SECRET_KEY.startsWith("sk_test_"))
)
  throw new Error("Production deployment requires Clerk Production keys");

const database = new URL(process.env.DATABASE_URL);
if (
  !["postgres:", "postgresql:"].includes(database.protocol) ||
  !database.hostname.endsWith(".neon.tech") ||
  database.searchParams.get("sslmode") !== "require"
)
  throw new Error("Deployment DATABASE_URL must use a TLS Neon endpoint");
if (process.env.CRON_SECRET.length < 32)
  throw new Error("CRON_SECRET must contain at least 32 characters");
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.PRIVACY_CONTACT_EMAIL))
  throw new Error("PRIVACY_CONTACT_EMAIL must be an email address");
if (process.env.PRIVACY_OPERATOR_NAME.trim().length < 2)
  throw new Error("PRIVACY_OPERATOR_NAME is incomplete");

process.stdout.write(`${environment} configuration is present.\n`);
