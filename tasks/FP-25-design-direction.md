# FP-25 — Approve the design direction and system contract

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** DESIGN-STUDY.md.

## Checklist

- [x] Produce desktop/mobile visual proposals for the home, learning page and practice workspace using the existing dark/orange palette and the studied SF6 composition principles.
- [x] Define semantic colors, display/body fonts with Portuguese support and license, spacing, widths, radii, focus, motion and icon rules.
- [x] Compare React Aria, shadcn/ui and Radix against the existing stack; choose one primitive family after checking peer dependencies, license, maintenance and bundle impact.
- [x] Define imagery placements, action hierarchy and separate reading vs practice layouts.
- [x] Record the chosen direction and obtain owner review of the concrete visual proposal before broad screen migration.

**Acceptance:** a reviewable visual reference and token/component contract exist; button/link treatment, action spacing, mobile navigation and imagery are explicit. No generic library theme is treated as the final art direction.

**Evidence:** approved design artifact, library decision and examples of all interaction states. Research recommendations are in DESIGN-STUDY.md, not a prior dependency-install authorization.

Implementation decision: DESIGN-SYSTEM.md records the selected interaction library, native/CSS boundaries, tokens, typography, spacing, imagery and motion rules. design/direction.html is the standalone desktop/mobile composition reference. The owner explicitly authorized proceeding through the backlog without further approval pauses; visual direction remains reviewable throughout implementation.
