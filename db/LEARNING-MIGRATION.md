# Learning activity migration

FP-38 adds migration 004. It creates a separate table and does not alter existing attempts, XP or identities. The composite primary key records one read, correct check or self-reported drill per account, lesson and revision. Repeats are idempotent and retain the first timestamp. A changed lesson revision needs new activity; old records remain exportable until retention removes them.

The API derives ownership from Clerk, checks the current published lesson/revision and verifies the submitted correct answer without storing answers. No duration, replay, free text, email or raw input is added. These records do not grant XP or establish in-game execution. Both records and attempts share export, transactional deletion, signed account-deletion cleanup and 180-day retention.

Compatibility: deploy the additive migration before the API uses it. Older code ignores the table. New code returns a recoverable unavailable message if it is absent. Local PostgreSQL migration and isolation/idempotency/deletion integration checks are the first validation target. Apply to the existing development Neon environment after the PR checks pass. Public-production setup remains separate.

Rollback: deploy the previous app first. Keep the table during rollback to avoid losing activity. Drop it only after an explicit data-disposal decision; do not discard existing attempts. No destructive rollback is run by normal deployment.
