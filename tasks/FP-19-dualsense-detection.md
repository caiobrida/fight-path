# FP-19 — Diagnose and restore physical controller detection

**Status:** Implemented; physical device QA pending. **Priority:** P1. **Dependencies:** FP-08 baseline.

**Context:** AUDIT A02, A04, A08. Owner's exact case: PS5 DualSense, USB, Windows 11, Chrome; initially no response in setup or practice. Synthetic tests reproduce the first-device selection defect. The owner subsequently confirmed live response after selecting the exact controller; full hardware checks remain open.

November 17 follow-up: the owner confirmed that selecting the exact controller restored button response. Controller choice and activation were hidden inside collapsed diagnostics. They are now visible alongside live buttons, with an explicit warning when another input mode is active and a Use this controller action in both locales. This confirms reported button recognition after selection, not the complete physical-device matrix.

An additional browser reproduction exposed first-activation defects: connecting after starting left practice at Attempts0 and connecting during calibration cancelled the selected action. Both failed before the fix and pass after separating first exposure from an established profile switch. Profile transitions restart capture against the loaded mapping; saved bindings and held-button focus recovery have browser coverage.

## Checklist

- [x] Capture a failing end-to-end case before the fix, recording device mode, index, page focus and training state.
- [x] Add a local diagnostic view for connection, selected controller, buttons, axes, mapping type and permission/API errors. Keep hardware details and raw events off the server.
- [ ] Let users select an active controller; preserve selection through polling and handle disconnect/reconnect and index reuse.
- [x] Explain when browser activation is needed and distinguish unsupported, not detected, waiting, disconnected and running states.
- [x] Handle `getGamepads()` failures without crashing or leaving a false connected state; keep keyboard/touch alternatives usable.
- [ ] Verify DualSense USB with D-pad, stick and six attacks, and the idle-first/active-second synthetic fixture.

**Acceptance:** the reported hardware can be detected and its live buttons seen in setup and practice, or a specific reproducible external limitation is displayed and documented. No claim of physical support based only on unit fixtures.

**Evidence:** before/after reproduction, adapter tests, actual browser/OS/controller details and both locales. References: [Gamepad spec](https://www.w3.org/TR/gamepad/), [MDN connection requirements](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API).

Implementation: added a local controller monitor in setup and practice, explicit controller selection and guarded API polling. Selection is tab-local and no hardware data is transmitted. Automated sparse-slot/second-controller/permission-denial checks pass. Physical DualSense USB verification remains pending; do not claim the reported hardware case is resolved yet.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
