const environment = process.env.VERCEL_ENV;
if (environment !== "preview" && environment !== "production") process.exit(0);

const required = [
  "DATABASE_URL",
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
