# FP-38 — Track learning activities without conflating skill measures

**Status:** Awaiting owner approval. **Priority:** P2. **Dependencies:** FP-23, FP-29, FP-35, FP-36.

## Checklist

- [ ] Define separate states for lesson read, knowledge check, browser command result and self-reported in-game drill.
- [ ] Design minimal versioned lesson completion storage bound to server-resolved Clerk users; propose any migration before applying it.
- [ ] Provide resume/next activity and progress by track with clear labels; decide whether reading rewards exist and prevent duplicate rewards on reload.
- [ ] Include the new data in export, deletion, account-deletion webhook and retention rules; document purpose and minimize storage.
- [ ] Preserve existing attempts and XP semantics or explicitly migrate them; stale lesson revisions must not silently certify newly changed content.

**Acceptance:** learning progress survives sign-in/reload and remains private to the account. Reading or a self-check is never displayed as proof of in-game combo execution or match competence.

**Evidence:** isolation, idempotency, migration rollback/compatibility review, export/delete tests and bilingual dashboard review.
