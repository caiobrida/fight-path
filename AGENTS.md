# FightPath project instructions

Read `PRODUCT.md`, `ARCHITECTURE.md`, `ROADMAP.md`, and `TASKS.md` before changing the product. These files are the shared, durable project context. Update the relevant file whenever a decision, constraint, or scope change should survive this chat and be visible to other developers.
Read `SOURCES.md` before publishing game content and `PRIVACY.md` before changing data collection or server behavior.
Read `QA.md` before claiming device compatibility or public-release readiness.

## Product scope

- FightPath is a gamified web learning platform for fighting games. The first supported game is Street Fighter 6, the first character is Ken, and the first control scheme is Classic.
- Keep universal input practice separate from character-specific lessons. Design for more characters and games later without claiming they are supported now.
- The owner explicitly requested contextual SF6 character art and move demonstrations throughout relevant learning and practice surfaces. General sections may use any character; Ken-specific sections use Ken. Illustrative characters do not imply a supported character training path. Put captured inputs directly below the target command, mark accepted/rejected attempts with green/check and red/cross plus text, and respect reduced-motion preferences. Keep media provenance in `MEDIA.md` and `media-sources.json`; never automate the game to obtain assets.
- Deliver user-facing interface, lessons, feedback, and accessibility text in both English (`en`) and Brazilian Portuguese (`pt-BR`) from the start.
- Build a responsive, mobile-first experience that is comfortable in a desktop browser and on a phone. Account for touch targets, small screens, and physical controllers in practice flows.
- Plan persistence with PostgreSQL on Neon and future hosting on Vercel. Never expose database credentials to browser code.
- The currently supplied Neon database is for development across local work, Vercel Preview, and this Vercel project's Production-labeled deployment. Its migrations 001-003 are applied and it had no learner attempts at setup. This Vercel project is a development environment even though Vercel calls its `main` deployment Production. Before a public release, create a separate Neon database and production deployment configuration; never promote the development connection as public-production configuration.
- The current Vercel project for this repository is `fight-path` in scope `caiobrida1-5669s-projects`, project ID `prj_2nqJOlMttvYTtrtyN2eULelvlwY1`. Confirm that identity before changing its settings, variables, or deployments. A future public-production environment may use another Vercel project after the owner decides its configuration; do not create or link one as part of development setup.
- Authentication is mandatory for control setup, practice, and progress. Clerk owns accounts and sessions; PostgreSQL stores only Clerk user IDs alongside practice attempts.
- Use only the existing Clerk application named `fight-path` with application ID `app_3MEZV1U7aZzsep5eEdSErRrIH8q`. Before any Clerk CLI operation that can link, pull keys, change settings, or deploy, confirm that exact application is selected. Never create another Clerk application, switch applications, or replace working keys for this repository.
- Use the `fight-path` Clerk Development instance for local work and both deployment targets in the current development Vercel project. `FIGHTPATH_RELEASE_MODE=development` marks its Production-labeled target. Automatic Git deployments are enabled for this development project. Defer the Clerk Production instance until a separate public-production environment is prepared. Do not use Development keys for real user workloads.
- Build with security and Brazilian LGPD requirements in mind: minimize personal data, protect access, document purposes and retention, and support user access and deletion before public release. Follow `PRIVACY.md`.

## Game information

- The owner explicitly prohibited automating Street Fighter 6 on November 17, 2026. Do not launch, focus, navigate, control or execute inputs in SF6 through computer-use tools, scripts, bots, macros, injected input, game integration or any other automation. This applies to menus, training/offline modes and online play. Do not alter game processes or attempt to bypass anti-cheat. Advance notice does not authorize SF6 automation.
- Continue source research, FightPath implementation and isolated website tests without controlling SF6. Gameplay verification and capture must be performed manually by the owner or another human reviewer. Review supplied recordings and prepare original bilingual explanations, captions and media edits within their recorded evidence. Keep unverifiable recipes unpublished; never describe a source table, synthetic fixture or storyboard as a successful in-game test.

- Publish game facts only after checking real, reputable sources. Prefer official Capcom material and record the URL, access date, and applicable game version or patch. FP-02 defines the source catalog and review process.
- Separate verified game facts from FightPath's approximate input evaluation. Do not claim that a browser simulator reproduces Street Fighter 6 timing or confirms an in-game combo without evidence.
- Treat ideas from the earlier conversation as proposals unless `PRODUCT.md` or another decision record labels them confirmed.

## Code and documentation

- Before interacting with any permitted browser or other desktop application through computer-use tools, tell the owner what application will be controlled and why. Do not open or take control silently. The SF6 prohibition above takes precedence over this notice rule. Code edits, terminal commands and isolated automated FightPath tests can continue within the authorized development scope; announce any test that will visibly control the owner's desktop first. Synthetic input fixtures must remain isolated from the actual game.

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

The task index is `TASKS.md`; each `tasks/FP-XX-*.md` file has a checklist and acceptance criteria. The earlier implementation authorization applies to FP-01 through FP-18, with a separate branch, PR, passing CI, and merge for each task. Neon, Vercel, and Clerk public-production configuration will be supplied later.

On November 17, 2026 the owner approved implementation of FP-19 through FP-40, with a separate branch, PR, passing CI and merge for each task. Continue autonomously through the approved backlog. Record real hardware, current-game combo and learner validation honestly: do not mark those checks complete without evidence. The concrete visual proposal in FP-25 remains reviewable before broad screen migration. `AUDIT.md`, `DESIGN-STUDY.md` and `RESEARCH-CONTENT.md` record the study.

The reported hardware failure is specifically a PS5 DualSense over USB on Windows 11 with Google Chrome. On November 17, 2026 the owner confirmed that selecting the exact controller restored live button response. Keep controller choice, input-device activation and live buttons visible; detecting hardware does not select Gamepad input mode. Separate first browser activation from switching an existing controller profile: the first activation must not silently pause practice or cancel pending calibration. Full D-pad/stick/six-attack, saved-layout and reconnect hardware validation remains separate from synthetic tests. Preserve the dark/orange visual direction, mobile-first behavior, both languages and verified game sources in the proposed redesign.

`IMPLEMENTATION-STATUS.md` records the delivered expansion and remaining physical/content/provider gates. The learning catalog has eighteen bilingual lessons; migration 004 adds separate revision-aware activities and is applied to local and development Neon databases. CI uses disposable PostgreSQL and headless component tests; authenticated local checks may create only disposable users in the exact Development instance `ins_3MEZV6ajaCTDDmbGUxEVoFC7diH` and must clean them up. Do not put Clerk secrets or Neon credentials in CI. BnB candidates remain outside the published catalog until both-side current-game evidence and instructional media exist. The observed SF6 title version is 2.0500.001; no battle-build execution certification follows from that observation.
