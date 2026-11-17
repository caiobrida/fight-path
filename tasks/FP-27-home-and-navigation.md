# FP-27 — Redesign the home and persistent navigation

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** FP-26; FP-37 for shipped media.

**Context:** AUDIT A01/A10/A12. No implementation of proposed sections is implied by their appearance in a design.

## Checklist

- [ ] Replace the adjacent text actions with a clear primary practice action and a separated secondary setup action, stacking on mobile.
- [ ] Present the learning offering with purposeful imagery, clear type hierarchy and entries for fundamentals, Ken, BnBs and execution.
- [ ] Add consistent header/footer and mobile navigation with active state and accessible menu behavior.
- [ ] Preserve the equivalent route when switching locale, including safe fallback for unavailable lessons.
- [ ] Handle signed-out/signed-in actions and resume links without misleading course-completion claims.
- [ ] Introduce sections as their dependent features ship; never publish dead links to unfinished tasks.

**Acceptance:** both main actions are distinct, spaced and comfortable to tap; a learner can find each shipped learning area from any page and switch language without being sent unnecessarily to the home.

**Evidence:** desktop/mobile visual checks, navigation/locale/auth tests and media budget measurements.
