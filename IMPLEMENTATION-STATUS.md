# Implementation and validation status

Updated November 17, 2026. This is the current delivery summary for FP-19 through FP-40. It supersedes the original planning-only status text; task checkboxes preserve any evidence that is still missing.

## Delivered application

- A shared dark/orange design system, action spacing, responsive header, locale-preserving navigation, accessible dialogs and a component gallery. Primary and secondary actions have explicit button styling; secondary card actions are no longer underlined.
- Controller selection and local diagnostics, button/axis calibration, swap/clear/cancel, local controller profiles and a saved preferred device. Standard-layout button positions have bilingual labels with raw fallbacks; vendor-specific symbols are not guessed.
- Attempt boundaries preserve held-button state; changing direction while an attack remains held does not generate another attempt. Touch dragging, focus/disconnect resets, keyboard fallback and mapping persistence have regression coverage.
- Account-scoped pending/rejected queues, actionable sync failures, retry, unsynced export and serialized save/delete operations. The final audit fixed a profile-initialization race that could reload a layout or pause practice after starting.
- Eighteen bilingual lessons covering notation, attack types, attack phases, strike/throw defense, hit/block decisions, links/cancels, anti-air, spacing, whiff punishment, SF6 systems, Ken decisions and practice habits. Lessons have sources, prerequisites, level, revision, examples, checks, drills and previous/next navigation.
- Original lesson diagrams and an explicitly loaded official Ken video, with provenance, accessible text alternatives and no player request before loading. Frame sources allow the chosen player and documented Clerk protection hosts.
- Separate account-bound reading, correct-check and self-reported drill records, a resume dashboard, export, deletion and retention. Additive migration 004 is applied locally and to the existing development Neon database. Input XP is unchanged.
- Safe localized auth destinations, including setup and lesson return, sign-in/sign-up transfer and unlocalized aliases. A development banner and honest privacy-contact fallback are present. No guessed Terms agreement was published.
- A BnB collection with situation/difficulty/resource/position filters and verified-route presentation, mirrored notation, training conditions, clips/captions and separate activity. Six source-backed candidates are documented in BNB-REVIEW.md. They remain unpublished because current-game execution and both-side clips have not been verified.

## Evidence

- `node --env-file=.env.local scripts/test.mjs`: domain/server/content tests run against local PostgreSQL, including account isolation, idempotency, transactional deletion, signed webhook verification, expiry, retry and body bounds.
- `npm run test:browser`: the actual setup/practice components run in an isolated headless Chromium harness. It has synthetic standard/nonstandard and two-controller fixtures, configure-save-practice, held attacks, touch dragging, storage denial, keyboard fallback, dialog focus and delayed-save deletion tests. The harness is outside Next.js routes and is never an authentication bypass in deployed code.
- `npm run build` then `npm run test:site`: actual Next.js public routes, lesson links/assets, protected redirects, private endpoint denial, both locales, five viewport widths and serious/critical automated accessibility checks. Screenshots are kept in ignored test-artifacts for local visual review.
- `npm run test:auth`: opt-in headless Clerk testing against exactly development instance `ins_3MEZV6ajaCTDDmbGUxEVoFC7diH` of application `app_3MEZV1U7aZzsep5eEdSErRrIH8q`, with a localhost-only database guard. Disposable `+clerk_test` users are created and removed. It verifies signed-in setup, lesson/command persistence, export, deletion and switching accounts. Traces/screenshots/video are disabled for this suite. It is not Google OAuth consent testing.
- A real disposable-account deletion was sent through the existing development Clerk integration. Both fixture attempts and fixture learning records disappeared from Neon via the deployed webhook; remaining fixture records were zero. Invalid/expired signatures and idempotent retries are tested separately with generated fixture secrets.
- CI now provisions PostgreSQL 17, applies migrations, requires DATABASE_URL for integration tests and runs headless component regressions after formatting, lint, types, production-dependency audit and build. No Clerk secret or Neon connection is added to GitHub Actions.

## Remaining validation requiring the owner or physical equipment

| Gate | Why it remains open | Tasks |
| --- | --- | --- |
| DualSense USB on Windows 11 / Chrome, D-pad/stick/six attacks | Synthetic browser fixtures cannot certify the owner's physical device or its driver/browser exposure | FP-08, FP-16, FP-19, FP-20, FP-21, FP-28, FP-40 |
| Real Android/iOS multi-touch and assistive technology | Viewport tests and automated accessibility checks are not real-phone or screen-reader sessions | FP-16, FP-22, FP-26, FP-28, FP-40 |
| Six Ken routes, both sides, instructional clips and exact battle build | Source tables and the observed title version 2.0500.001 are not in-game execution evidence. No training attempt was performed | FP-32, FP-33, FP-34, FP-35, FP-37 |
| Google consent/new-existing-account transfer | Clerk testing tokens validate account behavior while bypassing the external provider consent step | FP-18, FP-39 |
| Learner walkthrough and future public launch | Requires actual learner feedback and the owner's future production operator/contact, infrastructure and privacy choices | FP-12, FP-13, FP-16, FP-17, FP-18, FP-39 |

The current Vercel Production-labeled target remains development, as authorized. Public-production configuration is intentionally deferred. Before any further browser, game or desktop control, tell the owner which application will be controlled and why; do not open it silently.
