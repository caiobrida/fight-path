# FP-23 — Verify progress synchronization and deletion races

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** FP-21.

**Context:** AUDIT A11 is a source-review risk, not a confirmed live data-loss incident. Existing retries collapse HTTP failures into generic pending state.

## Checklist

- [ ] Build deterministic tests for offline load/reconnect, retry after acknowledged save, duplicate UUID, session expiry, 429 and bounded queue exhaustion.
- [ ] Check saves in flight during account change/unmount and progress deletion, using disposable test accounts and data only.
- [ ] Fix reproduced races so deleted attempts are not recreated and account A's queue cannot be sent as account B.
- [x] Distinguish recoverable network errors, authentication required, rejected data and rate limit; provide appropriate retry/backoff and readable status.
- [ ] Preserve unsynced attempts and idempotency while reporting what is actually saved; review timestamp and recent-mastery semantics for delayed uploads.

**Acceptance:** documented scenarios pass, deletion stays deleted after in-flight work settles, and retry cannot duplicate or transfer attempts. Unsupported/rejected records do not silently block the whole queue indefinitely.

**Evidence:** network-controlled integration tests with before/after rows. No destructive testing on the owner's progress.

Partial implementation: saves and explicit deletion now share a serial operation queue. Deletion pauses capture and blocks newly queued saves, waits for the in-flight request, then deletes. A failed delete restores retry eligibility. Loading cannot overwrite state during deletion. Deterministic queue tests cover write/delete ordering and recovery after rejection. HTTP error classification, browser race tests, offline scenarios and rejected-record handling remain pending.

HTTP recovery implemented: 401 asks for sign-in; 429 honors Retry-After or a 60-second cooldown; transient failures retain the queue; permanent 400/413/415/422 responses move to an account-scoped local review queue without blocking later attempts. Pending plus review records share the 500-item cap and can be downloaded together. Explicit progress deletion clears both queues. Recent mastery remains ordered by server save time, not offline input time. Full browser race scenarios remain part of FP-40.
