# FightPath

FightPath is a bilingual, mobile-first training platform for fighting game inputs. The first supported game and character are Street Fighter 6 and Ken with Classic controls.

## Local development

Requirements: Node.js 22 or newer, npm, and development keys for the existing Clerk application `fight-path` (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`). PostgreSQL is needed for saved progress.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run lint`, `npm run typecheck`, and `npm run build` to verify the application.
The home route selects `/en` or `/pt-BR` from the saved language preference or browser language. Both routes can be opened directly.
Sign in first. Open `/en/setup` or `/pt-BR/setup` to map keyboard, gamepad, or touch controls and test the input before saving the layout on the device.
Open `/en/practice` or `/pt-BR/practice` for the first universal input challenge. Practice feedback follows FightPath's documented timing rules, not the game's combat engine.
Pull requests run formatting, lint, type checking, tests, and a production build in GitHub Actions before integration.

For local persistence, copy `.env.example` to `.env.local`, replace the sample password with a random local value in both `POSTGRES_PASSWORD` and `DATABASE_URL`, then run `npm run db:up` and `npm run db:migrate:local`. Docker Desktop runs PostgreSQL on `127.0.0.1:5433`. Link the existing Clerk application with `npx -y clerk@latest link --app app_3MEZV1U7aZzsep5eEdSErRrIH8q` and pull its development keys with `npx -y clerk@latest env pull --app app_3MEZV1U7aZzsep5eEdSErRrIH8q`. Never create a second Clerk application for this repository. Keep real secrets out of Git.

Clerk accounts are mandatory for setup, practice, and progress. PostgreSQL stores the Clerk user ID with each attempt; the old anonymous development records are discarded by migration 003. Progress can be exported or deleted from the signed-in account. Account deletion requires a signed Clerk `user.deleted` webhook at `/api/webhooks/clerk`, configured separately for each deployed environment. Neon will replace the local `DATABASE_URL` in production.

## Learning and regression checks

The public learning catalog is at `/en/learn` and `/pt-BR/learn`. Signed-in learning records are at `learn/progress`. The Ken BnB library is at `ken/combos`; unverified routes remain unavailable. Read [implementation status](IMPLEMENTATION-STATUS.md) and [media provenance](MEDIA.md) before claiming current-game or hardware compatibility.

Run `node --env-file=.env.local scripts/test.mjs` for local PostgreSQL integration tests. `npm test` requires a database in CI so integration tests cannot silently skip. Run `npx playwright install chromium` once, then `npm run test:browser` for isolated component regressions. After a production build, `npm run test:site` checks actual local public routes. `npm run test:auth` uses the selected Clerk Development instance and a localhost database with disposable test accounts; it never enables auth bypasses in the app or copies secrets into CI.

## Shared documents

- [Product brief](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Task index](TASKS.md)
- [Game sources](SOURCES.md)
- [Privacy and security plan](PRIVACY.md)
