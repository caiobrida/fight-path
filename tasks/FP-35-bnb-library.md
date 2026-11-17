# FP-35 — Present Ken BnBs as a practical reference and drill

**Status:** Library implemented; verified recipe publication gated. **Priority:** P2. **Dependencies:** FP-29, FP-34, FP-37.

## Checklist

- [ ] Add a Ken BnB collection filtered by starter/situation, difficulty, resource use and position using the verified recipes.
- [ ] Show step-by-step notation, button legend, left/right presentation, source/build and a controlled example clip.
- [ ] Explain when to choose the route, common drop points and an easy alternative; provide the exact in-game setup for practice.
- [x] Allow learners to mark an in-game drill as practiced without equating self-report or reading with automatic combo validation.
- [x] If input rehearsal is later desired, create a separate proposed task for multi-step evaluator design and verification; do not reuse single-motion success as proof of combo success.

**Acceptance:** a beginner can find a useful route and practice it in SF6; the UI truthfully describes whether the activity is reading, browser input practice or in-game practice.

**Evidence:** catalog/locale checks, video fallback and learner route-selection walkthrough.

## Implementation evidence (2026-11-17)

Bilingual BnB collection, combined situation/difficulty/resource/position filters and source/review empty states implemented. Published detail routes support mirrored step notation, transition labels, conditions, resource/build metadata, captioned both-side clips, fallback, sources and separate account activity. Unverified routes remain unavailable, including direct URLs; candidate notation stays in BNB-REVIEW.md, outside the application catalog. Publication is blocked only by FP-34 in-game execution and clip evidence, not remaining library code. Filter/facing/publication-gate regressions added.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
