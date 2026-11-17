# FP-18 — Require Clerk authentication

**Goal:** use only the existing Clerk `fight-path` application (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`) for mandatory account access and account-bound progress.

**Dependencies:** FP-05, FP-14, FP-17. The owner confirmed that anonymous development records contain no real learner data and may be discarded.

## Checklist

- [x] Link the existing Clerk application and install its Next.js SDK without creating another application.
- [x] Add localized sign-in, sign-up, and signed-in account controls in `en` and `pt-BR` with mobile-first layout.
- [x] Require a signed-in account for setup and practice pages, and return `401` from every unauthenticated progress API request.
- [x] Replace anonymous session storage with server-resolved Clerk user IDs and discard old development records in a database migration.
- [x] Scope browser-side pending attempts by account and keep the progress export and deletion flows account-bound.
- [x] Add a signed `user.deleted` webhook endpoint for account-deletion cleanup.
- [x] Update privacy, architecture, release configuration, and agent instructions with the exact Clerk application restriction.
- [x] Verify types, tests, build, database migration, user isolation, and unauthenticated HTTP behavior locally.
- [ ] Configure Clerk production keys and a `user.deleted` webhook signing secret for each deployed environment; test real account deletion.
- [ ] Have a learner review complete sign-in, sign-up, sign-out, and account switching flows in both languages on mobile and desktop.

**Acceptance:** no setup, practice, or progress data is accessible without a Clerk account; each database query scopes data by the authenticated Clerk user ID; account deletion removes saved attempts once the signed webhook is configured. External production configuration and real-device checks remain release gates.
