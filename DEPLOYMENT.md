# Deployment runbook

FightPath is prepared for Vercel, but no Vercel project or production database is connected in this repository. Public release remains gated by `QA.md` and `PRIVACY.md`. Use only the Clerk application `fight-path` (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`) for all environments. Its development instance is linked locally; a production instance is not configured yet.

## Environments

| Environment | Database | Use |
| --- | --- | --- |
| Local | PostgreSQL 17 in Docker, bound to `127.0.0.1:5433` | Development and integration checks |
| Preview | Dedicated Neon preview database | PR review with non-production data |
| Production | Separate Neon production database | Public use after release approval |

Configure the following in Vercel Project Settings separately for Preview and Production. Never add secret values to Git or a `NEXT_PUBLIC_` variable. The Clerk publishable key is intentionally public.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL URL with `sslmode=require`; use the pooled endpoint for server functions |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key for the selected `fight-path` Clerk application and matching environment |
| `CLERK_SECRET_KEY` | Secret key from the same Clerk application instance; server only |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Signing secret for that environment's `user.deleted` webhook endpoint; server only |
| `CRON_SECRET` | Random secret of at least 32 characters; authorizes the retention job |
| `PRIVACY_OPERATOR_NAME` | Published legal or project operator identity after review |
| `PRIVACY_CONTACT_EMAIL` | Private contact for data requests; do not use a public issue tracker |

`VERCEL_ENV` is supplied by Vercel. The `prebuild` check refuses a Preview or Production build if required values are missing, placeholder values are used, or the database URL is not a TLS Neon endpoint. Run the SQL migrations against each database before accepting traffic. `npm run db:migrate` applies numbered migrations in one transaction and can be rerun safely. The runtime uses a bounded `pg` pool and parameterized queries.

## First preview

1. Create separate Neon preview and production databases. Copy the pooled TLS URLs through secure environment settings. Review database roles and grant only the permissions needed by the app.
2. Configure the existing Clerk `fight-path` application for Preview and Production. Do not create another application or replace keys from a different one. Set the seven required variables for Preview in Vercel, with matching Clerk keys and webhook signing secret. Keep Production values separate. The production operator and contact values must be confirmed by the owner.
3. Run `npm run db:migrate` with the preview `DATABASE_URL` in the command environment. Confirm `schema_migrations` contains `001_initial`, `002_session_retention`, and `003_clerk_users`. Migration 003 drops anonymous development attempts and sessions; do not run it on any database containing real learner data without a separate migration plan.
4. Connect `caiobrida/fight-path` to the Vercel project with `main` as the production branch. Confirm that PRs receive Preview deployments and that Vercel does not expose environment values to the browser.
5. Configure the signed Clerk `user.deleted` webhook for `/api/webhooks/clerk` on each deployed environment. On a Preview URL, check both locales, privacy pages, `/api/health`, sign-in, sign-up, sign-out, protected setup and practice, progress reload, export, deletion, and account switching. Verify the webhook removes attempts after account deletion. Check that `/api/cron/retention` returns 401 without the bearer secret and that all progress routes return 401 without a Clerk session.

The [Vercel environment guide](https://vercel.com/docs/environment-variables) describes Preview and Production scoping. The [Neon pooled-connection guide](https://neon.com/blog/postgres-support-case-recap) explains pooled URLs for server functions.

## Retention and monitoring

`vercel.json` schedules `/api/cron/retention` daily at 03:00 UTC on Production. Vercel sends `CRON_SECRET` as a bearer token; the route rejects missing or incorrect tokens. The job deletes attempts older than 180 days. Monitor its invocation and 5xx rate in Vercel function logs. Monitor the signed account-deletion webhook for failed deliveries and retries. `/api/health` checks the database without exposing connection details.

Review Neon and Clerk data processing, backup retention, and deletion behavior before public collection. Record a private process for access, deletion, and incident requests. Do not log session tokens, database URLs, raw inputs, or exported progress.

## Release and rollback

Before public release, finish the real-device and learner checks in `QA.md`, verify the bilingual notice and legal basis, confirm processor regions and agreements, test a restore from backup, and review the production privacy contact. Run migrations against Production before promoting a compatible deployment. Recheck the [Capcom Ken command list](https://www.streetfighter.com/6/character/ken/movelist) after relevant game updates.

If an application release fails, investigate function logs and `/api/health` before reverting. Migration 003 is destructive and the prior anonymous-session build is incompatible with it. Do not deploy that older build against a migrated database. Restore from a verified backup only when a data change requires it; record the incident and the affected retention period. Do not roll back by deleting production tables.
