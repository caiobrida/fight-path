# FP-39 — Complete authentication return flows and privacy checks

**Status:** Awaiting owner approval. **Priority:** P2. **Dependencies:** FP-27; FP-18 baseline.

**Context:** AUDIT A13/A14. The previous OAuth fix changed parameters but did not verify a full Google return. The product currently has a privacy notice, no linked Terms page.

## Checklist

- [ ] Complete Google sign-in/sign-up from home and privacy, new/existing-account transfer, sign-out and account switching in both locales.
- [ ] Verify protected setup/practice return destinations and safe allowed redirect handling; audit unlocalized environment fallbacks against the actual routes.
- [ ] Reproduce any malformed redirect before changing logic; retain intended protected-page return rather than forcing every flow to practice.
- [ ] Check privacy operator/contact values and label the development deployment appropriately; a placeholder address is not a ready public contact.
- [ ] Configure/verify signed account-deletion webhook delivery and progress cleanup with disposable accounts; test invalid/replayed delivery handling.
- [ ] Decide whether a Terms page is needed and have its content reviewed before presenting agreement. Do not add a guessed legal document just to eliminate an unlinked 404.

**Acceptance:** approved auth paths return to a valid localized page, data stays account-bound and the privacy notice matches actual behavior. Record remaining public-release gates honestly.

**Evidence:** end-to-end matrix, signed webhook check, unsafe redirect tests and reviewed public notice values.
