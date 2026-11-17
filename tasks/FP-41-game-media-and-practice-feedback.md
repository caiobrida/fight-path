# FP-41 — Game imagery, demonstrations and execution feedback

**Status:** Implemented and locally verified. **Priority:** P1. **Authorized:** November 17, 2026.

## Scope

Use relevant Street Fighter 6 character art and actual move demonstrations across home, learning, setup and practice. General sections may illustrate concepts with any character; Ken-specific sections use Ken. Preserve universal exercise semantics and current-game content publication gates. Never automate SF6.

## Checklist

- [x] Record official asset sources, copyright, review scope and optimized local copies.
- [x] Add diverse character imagery and contextual move media to cards, readers and practical surfaces.
- [x] Put captured inputs immediately below the expected command.
- [x] Mark completed attempts with green/check or red/cross feedback, including accessible text.
- [x] Add responsive interaction/entrance/result animation with reduced-motion support and controllable demonstrations.
- [x] Verify both languages, narrow screens, media loading/failure, success/error/reset and existing input flows.

Prefer reusable media components and a central asset catalog. Images are illustrations; source clips do not certify present-build combos, exact frame data or browser-to-game execution equivalence.

Evidence: 31 component-browser tests, 18 actual Next.js site tests, production build, lint, typecheck, formatting and diff checks. `QA.md` records scope; screenshots include the three-character home, readers and both practice verdicts. `MEDIA.md` and `media-sources.json` record 17 official source assets and their optimized derivatives. Delivery follows the repository PR/CI/merge workflow; its status is recorded by the associated GitHub PR and Vercel deployment.
