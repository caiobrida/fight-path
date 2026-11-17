# FP-26 — Build the shared accessible design system

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** approved FP-25 direction.

## Checklist

- [ ] Implement tokens and the approved primitive family; document imports and ownership of generated/vendor code.
- [ ] Add reusable action links/buttons, fields/selects, tabs, cards, badges, alerts, progress, dialog, tooltip, empty/loading states and notation chips only as needed.
- [ ] Provide primary, secondary, quiet and destructive variants; cover focus-visible, pressed, disabled, loading, errors and long localized labels.
- [ ] Use correct anchor/button semantics, accessible icon labels and product-target 44px control heights; prose links stay recognizable.
- [ ] Add a reviewable component gallery and integrate Clerk appearance through supported customization.
- [ ] Check reduced motion, contrast, keyboard/screen-reader behavior, 200% zoom and narrow screens.

**Acceptance:** screens can share documented components without duplicated button CSS; action controls do not appear as plain underlined text or touch one another. Token changes propagate consistently.

**Evidence:** gallery, visual checks and focused accessibility tests. Preserve native input capture behavior where the design system meets the training pad.
