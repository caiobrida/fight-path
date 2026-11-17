# FightPath

FightPath is a bilingual, mobile-first training platform for fighting game inputs. The first supported game and character are Street Fighter 6 and Ken with Classic controls.

## Local development

Requirements: Node.js 22 or newer and npm. PostgreSQL is needed when persistence work begins; the application shell runs without it.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run lint`, `npm run typecheck`, and `npm run build` to verify the application.
The home route selects `/en` or `/pt-BR` from the saved language preference or browser language. Both routes can be opened directly.
Open `/en/setup` or `/pt-BR/setup` to map keyboard, gamepad, or touch controls and test the input before saving the layout on the device.
Pull requests run formatting, lint, type checking, tests, and a production build in GitHub Actions before integration.

For local persistence, copy `.env.example` to `.env.local`, replace the sample password with a random local value in both `POSTGRES_PASSWORD` and `DATABASE_URL`, then run `npm run db:up` and `npm run db:migrate:local`. Docker Desktop runs PostgreSQL on `127.0.0.1:5433`. Keep real secrets out of Git.

The first identity model is an opaque anonymous session cookie. Progress can be exported and deleted, but cannot be recovered if the cookie is lost. Neon will replace the local `DATABASE_URL` in a production environment.

## Project context

- [Product brief](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Task index](TASKS.md)
- [Game sources](SOURCES.md)
- [Privacy and security plan](PRIVACY.md)
