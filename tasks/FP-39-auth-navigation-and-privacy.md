# FP-39 — Complete authentication return flows and privacy checks

**Status:** Implemented; external Google consent check pending. **Priority:** P2. **Dependencies:** FP-27; FP-18 baseline.

**Context:** AUDIT A13/A14. The previous OAuth fix changed parameters but did not verify a full Google return. The product currently has a privacy notice, no linked Terms page.

## Checklist

- [ ] Complete Google sign-in/sign-up from home and privacy, new/existing-account transfer, sign-out and account switching in both locales.
- [x] Verify protected setup/practice return destinations and safe allowed redirect handling; audit unlocalized environment fallbacks against the actual routes.
- [x] Reproduce any malformed redirect before changing logic; retain intended protected-page return rather than forcing every flow to practice.
- [x] Check privacy operator/contact values and label the development deployment appropriately; a placeholder address is not a ready public contact.
- [x] Configure/verify signed account-deletion webhook delivery and progress cleanup with disposable accounts; test invalid/replayed delivery handling.
- [x] Decide whether a Terms page is needed and have its content reviewed before presenting agreement. Do not add a guessed legal document just to eliminate an unlinked 404.

**Acceptance:** approved auth paths return to a valid localized page, data stays account-bound and the privacy notice matches actual behavior. Record remaining public-release gates honestly.

**Evidence:** end-to-end matrix, signed webhook check, unsafe redirect tests and reviewed public notice values.

## Implementation evidence (2026-11-17)

Auth links now carry one returnTo value. Server pages accept only a known published local destination in the current locale, rejecting arrays, comma-concatenation, absolute/protocol-relative URLs, encoded traversal and auth loops. Both sign-in/sign-up transfer force the sanitized target. Setup/practice/learning progress preserve intended return. Unlocalized auth aliases redirect into the preferred locale. Development deployments show an explicit banner; placeholder privacy contact is not published. No guessed Terms agreement was added. Full external Google new/existing-account consent and live signed webhook delivery still require an interactive disposable-account check; route/signature regressions are covered in FP-40.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
