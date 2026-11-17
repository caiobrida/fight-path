# FP-37 — Add purposeful images and controlled demonstrations

**Status:** Awaiting owner approval. **Priority:** P2. **Dependencies:** FP-25, FP-26; content verification for gameplay clips.

## Checklist

- [ ] Build an asset register with author/source, license or permission, placement, dimensions, captions/alt text, patch scope and review status.
- [ ] Select authorized hero/Ken imagery and lesson thumbnails; create original notation/range diagrams and annotated gameplay captures.
- [ ] Review Capcom video policy and individual creator permissions; official art, wiki GIFs and downloadable files are not automatically licensed for redistribution.
- [ ] Add an accessible player with poster, pause/play, captions/transcript, reduced-motion handling and source-link fallback; use efficient short video where suitable instead of large GIFs.
- [ ] Load third-party embeds after explicit play and update privacy/CSP narrowly for the chosen providers; avoid autoplay audio and pre-play player tracking requests.
- [ ] Apply approved mobile image budgets, reserved aspect ratios, responsive formats and lazy loading for offscreen media; measure loading and runtime impact.

**Acceptance:** the home, Ken pages and lessons gain relevant imagery with documented provenance; demonstrations explain an action and remain readable/usable on slow mobile connections and with reduced motion.

**Evidence:** asset manifest, permissions, network inspection before play, mobile performance measurements and accessible fallback tests.
