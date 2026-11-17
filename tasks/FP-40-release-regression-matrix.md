# FP-40 — Add regression coverage and repeat the site audit

**Status:** Awaiting owner approval. **Priority:** P2, release gate. **Dependencies:** approved changes being validated; final pass after FP-19 through FP-39.

## Checklist

- [ ] Run configure-save-practice flows with synthetic gamepad fixtures in browser tests and real DualSense USB / Windows 11 / Chrome evidence.
- [ ] Cover no device, two devices, standard/nonstandard maps, axes/buttons, held inputs, reconnect/focus loss, storage denial and keyboard/touch fallbacks.
- [ ] Run a disposable PostgreSQL service/migrations in CI so account isolation integration tests cannot silently remain skipped; keep service credentials out of deployed settings.
- [ ] Add focused browser checks for critical auth, input, locale, progress/retry and navigation flows; protect test credentials and use disposable data.
- [ ] Check 320/360/390/768/1280px, real Android/iOS, keyboard, screen reader, 200% zoom, contrast, focus, reduced motion and long translations.
- [ ] Crawl shipped internal links and assets, inspect runtime errors and media failure states, and measure mobile loading/input responsiveness.
- [ ] Update AUDIT/QA with resolved and remaining items, sources/build review and owners. File newly found issues with reproduction before declaring completion.

**Acceptance:** required CI gates run the behaviors that previously escaped unit tests; claimed devices have actual evidence; no P1 regression remains open. Unsupported cases and untested hardware remain explicitly documented.

**Evidence:** CI run, repeatable regression commands, browser/device matrix and final audit. This is not authorization to test destructive actions on the owner's live data.
