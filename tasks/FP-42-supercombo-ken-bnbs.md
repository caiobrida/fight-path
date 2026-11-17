# FP-42 — Publish the SuperCombo Ken reference library

**Status:** Implemented and locally verified. **Authorized:** November 17, 2026.

The owner accepts SuperCombo as a trusted source for Ken combos without separate in-game validation. Use it for future general fighting-game and character research too. This supersedes FP-34/FP-35's previous publication requirement for manual execution and both-side recordings. Never automate SF6 or describe source-derived content as independently tested.

- [x] Read the linked current source tables and capture notation, categories, positions, costs and difficulty.
- [x] Record the source preference and updated publication policy in shared agent/product/source documents.
- [x] Publish the source-backed Ken routes, alternatives and templates with original bilingual interface text.
- [x] Add normal-hit/meterless, Counter Hit, Punish Counter, Drive Rush, Drive Impact, wall-splat, stun, Super and optimization categories.
- [x] Show accessible Drive/Super cost segments, resource ranges, position/difficulty filters and search.
- [x] Keep unknown/contradictory source values distinct from zero and preserve source links.
- [x] Verify filters, route detail, mirrored notation, both locales, responsive layout and accessibility.

Source: https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos. Read November 17, 2026; the page reports an edit at 11:03. The 126 current-table rows are in `src/content/data/ken-supercombo.json`; older tables explicitly marked as legacy on the source page are excluded.

Deduplication yields 124 published entries. The general curriculum remains eighteen lessons; combo references have separate navigation and retain account-bound activities. Build, lint, formatting and type checks pass, along with 52 Node/PostgreSQL tests and 27 actual-site tests. No migration, secret change or SF6 execution is required for this delivery.
