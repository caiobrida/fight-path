# FP-26 — Build the shared accessible design system

**Status:** Implemented; assistive-device QA pending. **Priority:** P2. **Dependencies:** approved FP-25 direction.

## Checklist

- [x] Implement tokens and the approved primitive family; document imports and ownership of generated/vendor code.
- [x] Add reusable action links/buttons, fields/selects, tabs, cards, badges, alerts, progress, dialog, tooltip, empty/loading states and notation chips only as needed.
- [x] Provide primary, secondary, quiet and destructive variants; cover focus-visible, pressed, disabled, loading, errors and long localized labels.
- [x] Use correct anchor/button semantics, accessible icon labels and product-target 44px control heights; prose links stay recognizable.
- [x] Integrate Clerk appearance and verify all gallery interaction states in the browser.
- [ ] Check reduced motion, contrast, keyboard/screen-reader behavior, 200% zoom and narrow screens.

**Acceptance:** screens can share documented components without duplicated button CSS; action controls do not appear as plain underlined text or touch one another. Token changes propagate consistently.

**Evidence:** gallery, visual checks and focused accessibility tests. Preserve native input capture behavior where the design system meets the training pad.

Implementation: React Aria and Lucide installed with lockfile; semantic CSS tokens, native action components, cards, fields, notices, progress and notation are shared. Accessible dialog/tabs/tooltip wrappers and a bilingual gallery at /[locale]/design-system demonstrate states. Types, lint, production build and production-dependency audit pass. Screen-reader and physical mobile evidence remain in FP-40; no compatibility certification is implied.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
