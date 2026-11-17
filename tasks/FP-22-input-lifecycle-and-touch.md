# FP-22 — Make input gestures and lifecycle recovery reliable

**Status:** Approved for implementation (2026-11-17). **Priority:** P2. **Dependencies:** FP-19, FP-20, FP-21.

**Context:** AUDIT A07-A09. Touch remains bound to the initial cell during a drag; capture, focus loss and device transitions need integrated checks.

## Checklist

- [x] Support sliding through touch directions while holding a pointer, including diagonals and a second attack pointer.
- [x] Define leaving the pad, pointer cancel/lost capture, opposing directions and interrupted gestures.
- [ ] Reset held state on blur, hidden tab, disconnect and device switch; resume without stale attempts or duplicate polling loops.
- [x] Stop calibration capture on cancel/navigation/device change and keep Tab/Escape/typing available outside intentional capture.
- [ ] Verify on Android Chrome and iOS Safari with real multi-touch; record unsupported combinations rather than inferring compatibility.

**Acceptance:** one continuous quarter-circle gesture plus an attack can be practiced; interruption produces neutral state and no phantom success or stuck control. Keyboard navigation works after calibration ends.

**Evidence:** adapter integration tests and real-phone demonstration. Keep real-time pointer handling separate from generic UI button abstractions.

Implementation: touch pointer movement resolves the cell under the finger, keeps independent attack pointers, and neutralizes outside the pad or on visibility loss. Adapters clear on hidden tabs; gamepad polling is guarded against duplicate starts and after stop. Calibration cancels on blur/hidden/Escape and does not capture Tab or browser shortcuts. Synthetic gesture regression passes. Real Android/iOS and physical disconnect/reconnect evidence remain pending in FP-40.
