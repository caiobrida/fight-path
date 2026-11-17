# FP-21 — Count actual attack edges once

**Status:** Awaiting owner approval. **Priority:** P1. **Dependencies:** FP-10/FP-11 baseline.

**Context:** AUDIT A06: one physical LP press produces a correct attempt followed by an incorrect attempt when direction is released while LP remains held.

## Checklist

- [ ] Reproduce the five-snapshot fixture in AUDIT through the practice orchestration seam before changing it.
- [ ] Keep held-button state independent of the motion/attempt history reset.
- [ ] Define behavior for held buttons at Start, pause/resume, clear, exercise change, side change and reconnect.
- [ ] Ensure direction-only changes and releases cannot manufacture attack edges or save extra attempts.
- [ ] Verify real presses still start distinct attempts with correct feedback, counts and pending saves across keyboard, gamepad and touch.

**Acceptance:** the fixture produces exactly one correct attempt and one queued record. Holding LP while moving or releasing directions adds zero attempts until a new physical attack edge occurs.

**Evidence:** failing-then-passing integration regression plus repeated commands on both facing directions. Do not rewrite evaluator tolerances to conceal an orchestration defect.
