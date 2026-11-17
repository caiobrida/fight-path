# FP-24 — Guide learners from connected device to first valid input

**Status:** Awaiting owner approval. **Priority:** P2. **Dependencies:** FP-19, FP-20, FP-21, FP-26.

**Context:** AUDIT A02/A09. Both screens start in Keyboard and practice captures only after Start, without a complete readiness flow.

## Checklist

- [ ] Show selected input mode and controller throughout setup and practice; restore the saved preference with an explicit fallback.
- [ ] Guide connect/activate, choose device, test direction, test attack, save and start; allow skipping steps that are already valid.
- [ ] Show input readiness separately from scoring, with a clear pre-start test and paused/running indicators.
- [ ] Explain physical buttons, numpad notation, facing side and simulator tolerances with examples in both languages.
- [ ] Replace raw action IDs in messages and provide actionable help when inputs are absent, unmapped or coming from another device.

**Acceptance:** a beginner with the reported DualSense setup can identify why input is or is not being read and complete one command without guessing which mode or state is active.

**Evidence:** observed learner walkthrough and error-state review. This task owns onboarding behavior; FP-28 owns its visual integration.
