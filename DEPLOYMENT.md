# Deployment runbook

The Vercel project `fight-path` (`prj_2nqJOlMttvYTtrtyN2eULelvlwY1`) exists in scope `caiobrida1-5669s-projects` and is connected to `caiobrida/fight-path` on GitHub, with `main` as its Vercel Production branch. The local directory is linked through ignored `.vercel` metadata. The project uses the Next.js preset and Node.js 22.x. This entire Vercel project is for development: PR branches deploy to Vercel Preview, and `main` deploys automatically to Vercel Production at `fight-path.vercel.app`. Both targets use the supplied development Neon database and the Development instance of Clerk application `fight-path` (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`). The Vercel Production target has `FIGHTPATH_RELEASE_MODE=development` to make this exception explicit. The first Git deployment from a PR branch was assigned to Vercel Production during project bootstrap; the subsequent `main` deployment became Ready and took the domain, and `/api/health` returned 200. Vercel's Production label does not mean the product is approved for public use. A future public-production environment may use a separate Vercel project and needs its own Neon database, Clerk Production instance, privacy review, and release checks in `QA.md` and `PRIVACY.md`.

## Environments

| Environment | Database                                           | Use                                |
| ----------- | -------------------------------------------------- | ---------------------------------- |
| Local       | PostgreSQL 17 in Docker, bound to `127.0.0.1:5433` | Development and integration checks |
| Vercel Preview                  | Currently supplied Neon database           | PR review with Clerk Development             |
| Vercel Production in this project | Same development Neon database           | Automatic `main` deployment for development |
| Future public production        | Separate Neon database to be created later | Public use after release approval           |

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

`VERCEL_ENV` is supplied by Vercel. `FIGHTPATH_RELEASE_MODE=development` is set only on the current Vercel Production target. The `prebuild` check requires a TLS Neon URL and matching Clerk Development keys for Preview and for this explicitly marked development target. It also requires `CRON_SECRET` for Vercel Production because the retention cron runs there. A future public-production target without the development marker requires Clerk Production keys, a signed deletion webhook secret, and reviewed privacy operator/contact values. Optional values are checked when present. `npm run db:migrate` applies numbered migrations in one transaction and can be rerun safely. The runtime uses a bounded `pg` pool and parameterized queries.

The currently supplied Neon database was inspected before migration on November 17, 2026: it had no tables or attempts. Migrations `001_initial`, `002_session_retention`, and `003_clerk_users` were then applied successfully. A read-only check confirmed only `attempts` and `schema_migrations` remain, with zero attempts. Its URL is configured in Vercel Preview and was also supplied to Vercel Production before this project was designated a development environment. The Vercel Production publishable Clerk key was verified to match the local Development instance. Secret values cannot be pulled for comparison; verify the database and Clerk connection on the first deployment. A future public-production environment must use a newly created and migrated Neon database, never this one. Vercel Secret values cannot be pulled into a local CLI process; use a separately supplied, Git-ignored Neon connection URL and verify its host and schema before any migration. Never let a command fall back to the local Docker `DATABASE_URL` when targeting Neon.

## First preview

1. Use the already migrated Neon database for both Vercel deployment targets in this development project. Confirm `/api/health` against each first deployment. Review database roles and permissions.
2. Use only the existing Clerk `fight-path` Development instance and keys in both targets. Preview currently has the database URL and both Clerk keys; add a Development `user.deleted` webhook secret when its stable endpoint is available. Confirm operator and contact values with the owner before public use. Configure the same Clerk application's Production instance only when a separate public-production environment is prepared.
3. Confirm Preview `schema_migrations` contains `001_initial`, `002_session_retention`, and `003_clerk_users`; the supplied database has already passed this check. Migration 003 drops anonymous development attempts and sessions; do not run it on any database containing real learner data without a separate migration plan.
4. Confirm the linked Vercel project is `prj_2nqJOlMttvYTtrtyN2eULelvlwY1` in scope `caiobrida1-5669s-projects`, connected to `caiobrida/fight-path` with `main` as the Vercel Production branch. Automatic Git deployments are enabled in `vercel.json`; confirm that PRs receive Preview deployments and that `main` deploys to the development URL without exposing secrets to the browser.
5. Configure the signed Clerk `user.deleted` webhook for `/api/webhooks/clerk` on each deployed environment. On a Preview URL, check both locales, privacy pages, `/api/health`, sign-in, sign-up, sign-out, protected setup and practice, progress reload, export, deletion, and account switching. Verify the webhook removes attempts after account deletion. Check that `/api/cron/retention` returns 401 without the bearer secret and that all progress routes return 401 without a Clerk session.

The current development domain is `fight-path.vercel.app`. Its Clerk Development webhook URL is `https://fight-path.vercel.app/api/webhooks/clerk`, with the `user.deleted` event selected. Verify its configured signing secret and delivery after the first deployment. Clerk's future Production instance requires an owner-controlled domain; the Vercel default domain does not replace that setup.

The [Vercel environment guide](https://vercel.com/docs/environment-variables) describes Preview and Production scoping. The [Neon pooled-connection guide](https://neon.com/blog/postgres-support-case-recap) explains pooled URLs for server functions.

## Retention and monitoring

`vercel.json` schedules `/api/cron/retention` daily at 03:00 UTC on Production. Vercel sends `CRON_SECRET` as a bearer token; the route rejects missing or incorrect tokens. The job deletes attempts older than 180 days. Monitor its invocation and 5xx rate in Vercel function logs. Monitor the signed account-deletion webhook for failed deliveries and retries. `/api/health` checks the database without exposing connection details.

Review Neon and Clerk data processing, backup retention, and deletion behavior before public collection. Record a private process for access, deletion, and incident requests. Do not log session tokens, database URLs, raw inputs, or exported progress.

## Release and rollback

Before public release, finish the real-device and learner checks in `QA.md`, verify the bilingual notice and legal basis, confirm processor regions and agreements, test a restore from backup, and review the production privacy contact. Run migrations against Production before promoting a compatible deployment. Recheck the [Capcom Ken command list](https://www.streetfighter.com/6/character/ken/movelist) after relevant game updates.

If an application release fails, investigate function logs and `/api/health` before reverting. Migration 003 is destructive and the prior anonymous-session build is incompatible with it. Do not deploy that older build against a migrated database. Restore from a verified backup only when a data change requires it; record the incident and the affected retention period. Do not roll back by deleting production tables.
