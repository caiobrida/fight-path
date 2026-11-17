# FP-20 — Make controller calibration complete and recoverable

**Status:** Implemented; physical device QA pending. **Priority:** P1. **Dependencies:** FP-19.

**Context:** AUDIT A03, A05, A09. Axes cannot be bound, and default assignments prevent direct swaps.

## Checklist

- [ ] Model button, axis polarity, D-pad/hat representations and dead-zone handling explicitly; inspect DualSense standard mappings before selecting defaults.
- [x] Add assign, swap/replace, clear and cancel flows with visible conflicts; releasing inputs must not bind an unintended held control.
- [x] Show familiar physical labels when known, with a raw-value fallback; explain LP/MP/HP/LK/MK/HK in both locales.
- [x] Save versioned profiles and preferred input mode so setup-to-practice uses the chosen layout; migrate or safely reset existing v1 mappings.
- [x] Distinguish multiple controller profiles without uploading hardware identifiers; define behavior when a different controller appears.
- [ ] Verify button swaps, axis direction/inversion, analog drift, diagonals, reload, blocked storage and reconnect.

**Acceptance:** DualSense D-pad and stick can be calibrated and tested, LP/HP can be swapped without a temporary binding, cancel restores normal navigation, and saved controls work on the practice page.

**Evidence:** calibration integration test and hardware demonstration, in `en` and `pt-BR`. Do not assume every nonstandard controller shares DualSense indices.

Implementation: axis polarity tokens, explicit swap/clear/cancel, v2 per-controller local profiles with v1 fallback, preferred device and tab controller selection persistence. Switching established profiles pauses practice and resets the physical baseline. First browser activation loads the mapping and preserves the user's pending calibration or started gamepad session. Mapping tests verify swaps, custom axis bindings and serialization. The owner confirmed button response after explicitly selecting the DualSense; drift behavior, all controls, reconnect and a full physical walkthrough remain pending.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
