# FightPath project instructions

Read `PRODUCT.md`, `ARCHITECTURE.md`, `ROADMAP.md`, and `TASKS.md` before changing the product. These files are the shared, durable project context. Update the relevant file whenever a decision, constraint, or scope change should survive this chat and be visible to other developers.
Read `SOURCES.md` before publishing game content and `PRIVACY.md` before changing data collection or server behavior.
Read `QA.md` before claiming device compatibility or public-release readiness.

## Product scope

- FightPath is a gamified web learning platform for fighting games. The first supported game is Street Fighter 6, the first character is Ken, and the first control scheme is Classic.
- Keep universal input practice separate from character-specific lessons. Design for more characters and games later without claiming they are supported now.
- Deliver user-facing interface, lessons, feedback, and accessibility text in both English (`en`) and Brazilian Portuguese (`pt-BR`) from the start.
- Build a responsive, mobile-first experience that is comfortable in a desktop browser and on a phone. Account for touch targets, small screens, and physical controllers in practice flows.
- Plan persistence with PostgreSQL on Neon and future hosting on Vercel. Never expose database credentials to browser code.
- Build with security and Brazilian LGPD requirements in mind: minimize personal data, protect access, document purposes and retention, and support user access and deletion before public release. Follow `PRIVACY.md`.

## Game information

- Publish game facts only after checking real, reputable sources. Prefer official Capcom material and record the URL, access date, and applicable game version or patch. FP-02 defines the source catalog and review process.
- Separate verified game facts from FightPath's approximate input evaluation. Do not claim that a browser simulator reproduces Street Fighter 6 timing or confirms an in-game combo without evidence.
- Treat ideas from the earlier conversation as proposals unless `PRODUCT.md` or another decision record labels them confirmed.

## Code and documentation

- Write all code, identifiers, filenames for code, configuration, and technical Git text in English. Localize user-facing strings instead of hardcoding one language.
- Do not add comments in code. Make intent clear through names, structure, types, and tests where useful.
- Keep input capture, normalized input events, command evaluation, content, and persistence separate. `ARCHITECTURE.md` records the current boundaries and unresolved decisions.
- Keep documentation current when implementation changes behavior or settles an open question. Use task IDs from `TASKS.md` in work descriptions.

## Git and pull requests

- Before **every commit, push, or PR operation**, verify the repository path, current branch, and that both fetch and push URLs for `origin` are exactly `https://github.com/caiobrida/fight-path`. Stop if any check fails or a different account is selected for authentication.
- If another GitHub account is the credential manager's default, select the authenticated `caiobrida` account for this repository and verify the account before publishing. Keep this repository's credential selection local; do not change authentication for unrelated repositories.
- Use a separate `codex/` branch for each task or coherent change and open a PR targeting `main`. Run the required CI checks before merging once CI exists.
- Set both Git author and committer to `Caio Brida <caiobrida1@gmail.com>` for every commit. Never use another identity. Do not add assistant or AI attribution to Git metadata, commit messages, PR titles, or PR descriptions.
- Write branch names, commit messages, PR titles, and PR descriptions in English.
- Do not commit secrets, credentials, or local environment values.

## Current work tracking

The task index is `TASKS.md`; each `tasks/FP-XX-*.md` file has a checklist and acceptance criteria. The project owner has authorized implementation of all listed tasks, with a separate branch, PR, passing CI, and merge for each task. Neon and Vercel production credentials will be supplied later; complete local and deployment-ready work without waiting for them.
