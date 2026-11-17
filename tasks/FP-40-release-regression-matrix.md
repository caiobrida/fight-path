# FP-40 — Add regression coverage and repeat the site audit

**Status:** Automated checks delivered; physical validation pending. **Priority:** P2, release gate. **Dependencies:** approved changes being validated; final pass after FP-19 through FP-39.

## Checklist

- [ ] Run configure-save-practice flows with synthetic gamepad fixtures in browser tests and real DualSense USB / Windows 11 / Chrome evidence.
- [x] Cover no device, two devices, standard/nonstandard maps, axes/buttons, held inputs, reconnect/focus loss, storage denial and keyboard/touch fallbacks.
- [x] Run a disposable PostgreSQL service/migrations in CI so account isolation integration tests cannot silently remain skipped; keep service credentials out of deployed settings.
- [x] Add focused browser checks for critical auth, input, locale, progress/retry and navigation flows; protect test credentials and use disposable data.
- [ ] Check 320/360/390/768/1280px, real Android/iOS, keyboard, screen reader, 200% zoom, contrast, focus, reduced motion and long translations.
- [ ] Crawl shipped internal links and assets, inspect runtime errors and media failure states, and measure mobile loading/input responsiveness.
- [x] Update AUDIT/QA with resolved and remaining items, sources/build review and owners. File newly found issues with reproduction before declaring completion.

**Acceptance:** required CI gates run the behaviors that previously escaped unit tests; claimed devices have actual evidence; no P1 regression remains open. Unsupported cases and untested hardware remain explicitly documented.

**Evidence:** CI run, repeatable regression commands, browser/device matrix and final audit. This is not authorization to test destructive actions on the owner's live data.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.

## Final implementation evidence (2026-11-17)

CI provisions PostgreSQL 17, runs migrations and refuses to silently skip integration tests. Local checks: 48 domain/server/content tests; 19 headless component regressions; 16 actual Next.js public/locale/redirect/link checks; one authenticated two-account workflow with acknowledged-save response held across switching and idempotent recovery. Generated signature fixtures cover invalid, expired, repeated and oversized webhook delivery. A real disposable-account deletion also cleaned both fixture tables through the deployed development webhook.

The browser flow reproduced a saved-profile failure (Attempts0) before the final fix. The 500ms default-profile transition could reload mapping/pause practice; synchronous external-store initialization fixes it, with unrelated controller changes ignored in keyboard mode. Additional audit fixes cover replacement characters, underlined actions, incomplete foundational topics, prerequisite cycles, review metadata and webhook body bounds. Production dependency audit, format, lint, types and build pass. QA.md and AUDIT.md record the remaining physical, external-consent and game-clip gates.
