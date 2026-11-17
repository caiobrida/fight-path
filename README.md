# FightPath

FightPath is a bilingual, mobile-first training platform for fighting game inputs. The first supported game and character are Street Fighter 6 and Ken with Classic controls.

## Local development

Requirements: Node.js 22 or newer and npm. PostgreSQL is needed when persistence work begins; the application shell runs without it.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run lint`, `npm run typecheck`, and `npm run build` to verify the application.

Copy `.env.example` to `.env.local` when database and session features are configured. Keep real secrets out of Git.

## Project context

- [Product brief](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Task index](TASKS.md)
- [Game sources](SOURCES.md)
- [Privacy and security plan](PRIVACY.md)
