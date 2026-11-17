# Deployment runbook

FightPath is prepared for Vercel, but no Vercel project or production database is connected in this repository. Public release remains gated by `QA.md` and `PRIVACY.md`.

## Environments

| Environment | Database | Use |
| --- | --- | --- |
| Local | PostgreSQL 17 in Docker, bound to `127.0.0.1:5433` | Development and integration checks |
| Preview | Dedicated Neon preview database | PR review with non-production data |
| Production | Separate Neon production database | Public use after release approval |

Configure the following in Vercel Project Settings separately for Preview and Production. Never add their values to Git or a `NEXT_PUBLIC_` variable.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL URL with `sslmode=require`; use the pooled endpoint for server functions |
| `CRON_SECRET` | Random secret of at least 32 characters; authorizes the retention job |
| `PRIVACY_OPERATOR_NAME` | Published legal or project operator identity after review |
| `PRIVACY_CONTACT_EMAIL` | Private contact for data requests; do not use a public issue tracker |

`VERCEL_ENV` is supplied by Vercel. The `prebuild` check refuses a Preview or Production build if required values are missing, placeholder values are used, or the database URL is not a TLS Neon endpoint. Run the SQL migrations against each database before accepting traffic. `npm run db:migrate` applies numbered migrations in one transaction and can be rerun safely. The runtime uses a bounded `pg` pool and parameterized queries.

## First preview

1. Create separate Neon preview and production databases. Copy the pooled TLS URLs through secure environment settings. Review database roles and grant only the permissions needed by the app.
2. Set the four required variables for Preview in Vercel. Keep Production values separate. The production operator and contact values must be confirmed by the owner.
3. Run `npm run db:migrate` with the preview `DATABASE_URL` in the command environment. Confirm `schema_migrations` contains `001_initial` and `002_session_retention`.
4. Connect `caiobrida/fight-path` to the Vercel project with `main` as the production branch. Confirm that PRs receive Preview deployments and that Vercel does not expose environment values to the browser.
5. On a Preview URL, check `/en`, `/pt-BR`, both privacy pages, `/api/health`, control setup, practice, progress reload, export, and deletion. Check that `/api/cron/retention` returns 401 without the bearer secret.

The [Vercel environment guide](https://vercel.com/docs/environment-variables) describes Preview and Production scoping. The [Neon pooled-connection guide](https://neon.com/blog/postgres-support-case-recap) explains pooled URLs for server functions.

## Retention and monitoring

`vercel.json` schedules `/api/cron/retention` daily at 03:00 UTC on Production. Vercel sends `CRON_SECRET` as a bearer token; the route rejects missing or incorrect tokens. The job deletes sessions created more than 180 days ago, and the foreign-key cascade deletes their attempts. Monitor its invocation and 5xx rate in Vercel function logs. `/api/health` checks the database without exposing connection details.

Review Neon backup retention and deletion behavior before public collection. Record a private process for access, deletion, and incident requests. Do not log session tokens, database URLs, raw inputs, or exported progress.

## Release and rollback

Before public release, finish the real-device and learner checks in `QA.md`, verify the bilingual notice and legal basis, confirm processor regions and agreements, test a restore from backup, and review the production privacy contact. Run migrations against Production before promoting a compatible deployment. Recheck the [Capcom Ken command list](https://www.streetfighter.com/6/character/ken/movelist) after relevant game updates.

If an application release fails, revert to the prior Vercel deployment and investigate function logs and `/api/health`. Keep migrations additive so the prior app remains compatible. Restore the database from a verified backup only when a data change requires it; record the incident and the affected retention period. Do not roll back by deleting production tables.
