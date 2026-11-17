# FP-21 — Count actual attack edges once

**Status:** Implemented; physical device QA pending. **Priority:** P1. **Dependencies:** FP-10/FP-11 baseline.

**Context:** AUDIT A06: one physical LP press produces a correct attempt followed by an incorrect attempt when direction is released while LP remains held.

## Checklist

- [x] Reproduce the five-snapshot fixture in AUDIT through the practice orchestration seam before changing it.
- [x] Keep held-button state independent of the motion/attempt history reset.
- [x] Define behavior for held buttons at Start, pause/resume, clear, exercise change, side change and reconnect.
- [x] Ensure direction-only changes and releases cannot manufacture attack edges or save extra attempts.
- [ ] Verify real presses still start distinct attempts with correct feedback, counts and pending saves across keyboard, gamepad and touch.

**Acceptance:** the fixture produces exactly one correct attempt and one queued record. Holding LP while moving or releasing directions adds zero attempts until a new physical attack edge occurs.

**Evidence:** failing-then-passing integration regression plus repeated commands on both facing directions. Do not rewrite evaluator tolerances to conceal an orchestration defect.

Verification: the practice component now uses AttemptWindow, which retains physical held state while clearing motion history. Regression tests cover the reported five-snapshot sequence, clear and reconnect; first samples seed held state rather than manufacture presses. Hardware cross-device confirmation is tracked in FP-40.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
