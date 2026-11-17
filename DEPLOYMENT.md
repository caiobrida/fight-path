# Deployment runbook

The Vercel project `fight-path` (`prj_2nqJOlMttvYTtrtyN2eULelvlwY1`) exists in scope `caiobrida1-5669s-projects` and is connected to `caiobrida/fight-path` on GitHub, with `main` as its production branch. The local directory is linked through ignored `.vercel` metadata. The project uses the Next.js preset and Node.js 22.x. Preview has `DATABASE_URL` and the Clerk Development publishable and secret keys. Four Preview values are still missing: `CLERK_WEBHOOK_SIGNING_SECRET`, `CRON_SECRET`, `PRIVACY_OPERATOR_NAME`, and `PRIVACY_CONTACT_EMAIL`. Seven variables exist in Production, but those values must be reviewed and the database and Clerk keys replaced before Production use. No deployment exists yet. Automatic Git deployments are disabled in `vercel.json` until Preview is ready and the Production configuration is isolated. Public release remains gated by `QA.md` and `PRIVACY.md`. Use only the Clerk application `fight-path` (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`) for all environments. Its Development instance is linked locally and used for Preview; a Production instance is not configured yet.

## Environments

| Environment | Database                                           | Use                                |
| ----------- | -------------------------------------------------- | ---------------------------------- |
| Local       | PostgreSQL 17 in Docker, bound to `127.0.0.1:5433` | Development and integration checks |
| Preview     | Currently supplied Neon database                   | Development and PR review          |
| Production  | Separate Neon database to be created later         | Public use after release approval  |

Configure the following in Vercel Project Settings separately for Preview and Production. Never add secret values to Git or a `NEXT_PUBLIC_` variable. The Clerk publishable key is intentionally public.

| Variable                            | Purpose                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `DATABASE_URL`                      | Neon PostgreSQL URL with `sslmode=require`; use the pooled endpoint for server functions |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key for the selected `fight-path` Clerk application and matching environment |
| `CLERK_SECRET_KEY`                  | Secret key from the same Clerk application instance; server only                         |
| `CLERK_WEBHOOK_SIGNING_SECRET`      | Signing secret for that environment's `user.deleted` webhook endpoint; server only       |
| `CRON_SECRET`                       | Random secret of at least 32 characters; authorizes the retention job                    |
| `PRIVACY_OPERATOR_NAME`             | Published legal or project operator identity after review                                |
| `PRIVACY_CONTACT_EMAIL`             | Private contact for data requests; do not use a public issue tracker                     |

`VERCEL_ENV` is supplied by Vercel. The `prebuild` check refuses a Preview or Production build if required values are missing, placeholder values are used, or the database URL is not a TLS Neon endpoint. It also refuses Clerk Development keys in Production. Run the SQL migrations against each database before accepting traffic. `npm run db:migrate` applies numbered migrations in one transaction and can be rerun safely. The runtime uses a bounded `pg` pool and parameterized queries.

The currently supplied Neon database was inspected before migration on November 17, 2026: it had no tables or attempts. Migrations `001_initial`, `002_session_retention`, and `003_clerk_users` were then applied successfully. A read-only check confirmed only `attempts` and `schema_migrations` remain, with zero attempts. This database is now designated for development and Preview, and its URL is configured in Vercel Preview. Create and migrate a different Neon database for Production. The current Vercel Production `DATABASE_URL` was entered before this environment decision and must be replaced with the new Production URL before any Production deployment. The existing Production Clerk keys also need to be replaced with keys from the same application's future Production instance. Vercel CLI requires owner approval to remove variables, so the earlier Production entries remain in place while automatic deployments are disabled. Vercel Secret values cannot be pulled into a local CLI process; use a separately supplied, Git-ignored Neon connection URL and verify its host and schema before any migration. Never let a command fall back to the local Docker `DATABASE_URL` when targeting Neon.

## First preview

1. Use the already migrated Neon database for Preview. Before any Production deployment, create a separate Neon database, replace the Production `DATABASE_URL`, apply migrations there, and review database roles and permissions.
2. Use only the existing Clerk `fight-path` Development instance and keys in Preview. Complete the four missing Preview variables, including a signed Development `user.deleted` webhook secret. Confirm operator and contact values with the owner. Configure the same Clerk application's Production instance and replace the Vercel Production Clerk keys only when Production is being prepared.
3. Confirm Preview `schema_migrations` contains `001_initial`, `002_session_retention`, and `003_clerk_users`; the supplied database has already passed this check. Migration 003 drops anonymous development attempts and sessions; do not run it on any database containing real learner data without a separate migration plan.
4. Confirm the linked Vercel project is `prj_2nqJOlMttvYTtrtyN2eULelvlwY1` in scope `caiobrida1-5669s-projects`, connected to `caiobrida/fight-path` with `main` as the production branch. Remove the temporary `git.deploymentEnabled: false` setting from `vercel.json` in a separate PR after the required variables and migrations are ready, then confirm that PRs receive Preview deployments and that secrets are not exposed to the browser.
5. Configure the signed Clerk `user.deleted` webhook for `/api/webhooks/clerk` on each deployed environment. On a Preview URL, check both locales, privacy pages, `/api/health`, sign-in, sign-up, sign-out, protected setup and practice, progress reload, export, deletion, and account switching. Verify the webhook removes attempts after account deletion. Check that `/api/cron/retention` returns 401 without the bearer secret and that all progress routes return 401 without a Clerk session.

The verified default Production domain is `fight-path.vercel.app`. Its Clerk webhook URL is `https://fight-path.vercel.app/api/webhooks/clerk`, with the `user.deleted` event selected. The endpoint will not be reachable until the first Production deployment. Add that webhook's signing secret to the Production `CLERK_WEBHOOK_SIGNING_SECRET` variable before enabling deployment. Clerk's Production instance also requires an owner-controlled domain; the Vercel default domain does not replace that setup.

The [Vercel environment guide](https://vercel.com/docs/environment-variables) describes Preview and Production scoping. The [Neon pooled-connection guide](https://neon.com/blog/postgres-support-case-recap) explains pooled URLs for server functions.

## Retention and monitoring

`vercel.json` schedules `/api/cron/retention` daily at 03:00 UTC on Production. Vercel sends `CRON_SECRET` as a bearer token; the route rejects missing or incorrect tokens. The job deletes attempts older than 180 days. Monitor its invocation and 5xx rate in Vercel function logs. Monitor the signed account-deletion webhook for failed deliveries and retries. `/api/health` checks the database without exposing connection details.

Review Neon and Clerk data processing, backup retention, and deletion behavior before public collection. Record a private process for access, deletion, and incident requests. Do not log session tokens, database URLs, raw inputs, or exported progress.

## Release and rollback

Before public release, finish the real-device and learner checks in `QA.md`, verify the bilingual notice and legal basis, confirm processor regions and agreements, test a restore from backup, and review the production privacy contact. Run migrations against Production before promoting a compatible deployment. Recheck the [Capcom Ken command list](https://www.streetfighter.com/6/character/ken/movelist) after relevant game updates.

If an application release fails, investigate function logs and `/api/health` before reverting. Migration 003 is destructive and the prior anonymous-session build is incompatible with it. Do not deploy that older build against a migrated database. Restore from a verified backup only when a data change requires it; record the incident and the affected retention period. Do not roll back by deleting production tables.
