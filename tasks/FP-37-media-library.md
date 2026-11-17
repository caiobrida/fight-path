# FP-37 — Add purposeful images and controlled demonstrations

**Status:** Diagrams and player shipped; gameplay clips gated. **Priority:** P2. **Dependencies:** FP-25, FP-26; content verification for gameplay clips.

## Checklist

- [x] Build an asset register with author/source, license or permission, placement, dimensions, captions/alt text, patch scope and review status.
- [ ] Select authorized hero/Ken imagery and lesson thumbnails; create original notation/range diagrams and annotated gameplay captures.
- [x] Review Capcom video policy and individual creator permissions; official art, wiki GIFs and downloadable files are not automatically licensed for redistribution.
- [x] Add an accessible player with poster, pause/play, captions/transcript, reduced-motion handling and source-link fallback; use efficient short video where suitable instead of large GIFs.
- [x] Load third-party embeds after explicit play and update privacy/CSP narrowly for the chosen providers; avoid autoplay audio and pre-play player tracking requests.
- [ ] Apply approved mobile image budgets, reserved aspect ratios, responsive formats and lazy loading for offscreen media; measure loading and runtime impact.

**Acceptance:** the home, Ken pages and lessons gain relevant imagery with documented provenance; demonstrations explain an action and remain readable/usable on slow mobile connections and with reduced motion.

**Evidence:** asset manifest, permissions, network inspection before play, mobile performance measurements and accessible fallback tests.

## Implementation evidence (2026-11-17)

Original static range, timing and resource diagrams are localized and registered in MEDIA.md. Ken has an explicitly loaded/unloaded official player with controls, requested captions, local poster and written/source fallback. No remote player request or autoplay before interaction. Historical footage is labeled; current annotated combo captures remain gated on FP-34 evidence. Fixed corrupt accents and the stale Ken home-card link found during integration.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
