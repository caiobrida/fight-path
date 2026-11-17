# FP-27 — Redesign the home and persistent navigation

**Status:** Done. **Priority:** P2. **Dependencies:** FP-26; FP-37 for shipped media.

**Context:** AUDIT A01/A10/A12. No implementation of proposed sections is implied by their appearance in a design.

## Checklist

- [x] Replace the adjacent text actions with a clear primary practice action and a separated secondary setup action, stacking on mobile.
- [x] Present the learning offering with purposeful imagery, clear type hierarchy and entries for fundamentals, Ken, BnBs and execution.
- [x] Add consistent header/footer and mobile navigation with active state and accessible menu behavior.
- [x] Preserve the equivalent route when switching locale, including safe fallback for unavailable lessons.
- [x] Handle signed-out/signed-in actions and resume links without misleading course-completion claims.
- [x] Introduce sections as their dependent features ship; never publish dead links to unfinished tasks.

**Acceptance:** both main actions are distinct, spaced and comfortable to tap; a learner can find each shipped learning area from any page and switch language without being sent unnecessarily to the home.

**Evidence:** desktop/mobile visual checks, navigation/locale/auth tests and media budget measurements.

Implementation: responsive hero with original SVG, separated filled/outlined actions, current learning overview and three-step onboarding. Header navigation and route-preserving EN/PT-BR switch are shared. Unshipped lessons remain labeled in preparation instead of linking to missing routes; FP-29 will connect them. Clerk appearance uses the installed SDK variables. Responsive/locale/auth checks remain in FP-40.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
