# FP-28 — Redesign setup and the execution workspace

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** FP-19 through FP-22, FP-24, FP-26.

## Checklist

- [ ] Use the design system for device selection, calibration, conflict handling and save/test states.
- [ ] Put target notation, live device readiness, current inputs and feedback before secondary rewards and long lists.
- [ ] Show controller-aware labels and direction/button diagrams with textual equivalents; distinguish physical input from logical SF6 action.
- [ ] Integrate optional sourced command examples without loading heavy media during an execution attempt.
- [ ] Make mobile touch controls reachable and preserve desktop keyboard/controller use, focus and left/right mirroring.
- [ ] Cover empty, paused, disconnected, incorrect, completed and sync-error states in both locales.

**Acceptance:** setup and practice feel like one coherent product; users can see what they should do, what the device sent and how to recover, with no regression in the approved input fixes.

**Evidence:** before/after visual review and complete configure-save-practice walkthrough with DualSense USB and touch.

Implementation: setup and practice share action components and semantic surfaces, compact expandable live diagnostics, responsive calibration cards, larger input notation, separated actions and feedback panels. The input adapters still receive native button events. Full hardware and mobile walkthroughs remain in FP-40.
