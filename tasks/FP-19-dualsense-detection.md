# FP-19 — Diagnose and restore physical controller detection

**Status:** Awaiting owner approval. **Priority:** P1. **Dependencies:** FP-08 baseline.

**Context:** AUDIT A02, A04, A08. Owner's exact case: PS5 DualSense, USB, Windows 11, Chrome; no response in setup or practice. The first-device selection defect is reproduced with synthetic devices; the owner's hardware cause remains open.

## Checklist

- [ ] Capture a failing end-to-end case before the fix, recording device mode, index, page focus and training state.
- [ ] Add a local diagnostic view for connection, selected controller, buttons, axes, mapping type and permission/API errors. Keep hardware details and raw events off the server.
- [ ] Let users select an active controller; preserve selection through polling and handle disconnect/reconnect and index reuse.
- [ ] Explain when browser activation is needed and distinguish unsupported, not detected, waiting, disconnected and running states.
- [ ] Handle `getGamepads()` failures without crashing or leaving a false connected state; keep keyboard/touch alternatives usable.
- [ ] Verify DualSense USB with D-pad, stick and six attacks, and the idle-first/active-second synthetic fixture.

**Acceptance:** the reported hardware can be detected and its live buttons seen in setup and practice, or a specific reproducible external limitation is displayed and documented. No claim of physical support based only on unit fixtures.

**Evidence:** before/after reproduction, adapter tests, actual browser/OS/controller details and both locales. References: [Gamepad spec](https://www.w3.org/TR/gamepad/), [MDN connection requirements](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API).
