# Product, interface and input audit

Date: 2026-11-17. Baseline: `5a6600c` on `main`, deployed at `fight-path.vercel.app`. This is an investigation and proposed backlog, not implementation approval. No runtime code, dependencies, database records, Clerk settings or Vercel settings were changed during this audit.

## Method and limits

- Inspected the public Portuguese home in Chromium, including screenshot and DOM measurements, and visually inspected the official Capcom Ken page. Read setup, practice, adapters, evaluator, persistence and CI source.
- Called public GET routes without a session. Ran the existing unit suite: 23 passed, one database integration test skipped because no database URL was passed. This is not proof of full user-flow coverage.
- Ran a disposable TypeScript harness against the existing `gamepadSnapshot`, `GamepadAdapter`, `assignControl`, `appendSample`, `newlyPressed` and evaluator. It used synthetic devices and replayed the practice attempt boundary; it neither emulated USB hardware nor wrote progress. Results below are sufficient to reconstruct regression cases.
- The owner reports a PS5 DualSense over USB on Windows 11 / Google Chrome: buttons had no visible effect in setup or practice. The exact cause remains unresolved: selected device mode, selected gamepad index, page focus and Start state were not captured. The investigation must not assume the owner omitted a step.
- The signed-in native Chrome accessibility read timed out twice. Authenticated page interaction and physical USB tests were therefore not completed. A requested 360px browser override remained at `innerWidth=1280`; no new mobile pass is claimed. The override was reset.
- No attempt was made to delete progress, switch the owner's account, complete Google OAuth, change controller settings or modify services. Offline/delete/account-switch races below are source-review risks, not reproduced incidents.

## Findings

P1 blocks reliable core practice; P2 affects usability or requires focused verification. Confirmed means source or replay evidence exists, not that a physical device was tested.

| ID | Priority / evidence | Finding and reproduction | Work |
| --- | --- | --- | --- |
| A01 | P2 / live DOM | Home actions touch with zero horizontal gap: first link right edge and second left edge both `278.734375px`; both are underlined, only `18px` high at the measured desktop view. They have no button variants or action group. | FP-26, FP-27 |
| A02 | P1 / user report + source | DualSense USB does not respond in setup or practice. Both components default to `keyboard`; practice only starts its adapter after Start. There is no remembered device choice or guided check explaining which state is active. These are possible contributors, not an established root cause. | FP-19, FP-20, FP-24 |
| A03 | P1 / source + replay | Calibration finds new entries only in `snapshot.controls`. Moving axes `[1,0]` produces `controls=[]`: direction can read right during preview, but calibration cannot bind that axis. Nonstandard axis 6 is ignored and remains neutral. | FP-19, FP-20 |
| A04 | P1 / real adapter with synthetic devices | `GamepadAdapter` always chooses the first non-null gamepad. With idle device 0 and `Button0` pressed on device 1, emitted controls stay empty. No controller selector exists. | FP-19 |
| A05 | P1 / direct function replay | On the default layout, assigning LP to `Button2` throws `Control is already assigned` because HP owns it. A direct swap is impossible and the UI offers neither clearing nor swapping; users must invent temporary unused bindings. | FP-20 |
| A06 | P1 / practice-loop replay | Sequence: down at 0ms, down-right at 50ms, right+LP at 100ms, neutral+LP at 120ms, neutral at 150ms. One physical LP press produces two evaluated attempts: correct (100ms), then incorrect (missing down). Clearing `attemptRef` loses held-button state before the next snapshot. This can corrupt accuracy and feedback. | FP-21 |
| A07 | P2 / source | Touch captures the initial button with pointer capture and releases on up/cancel; it does not handle pointer movement. Sliding one finger through a quarter circle cannot change direction while held. Dedicated diagonal buttons do not solve that gesture. | FP-22 |
| A08 | P2 / source | Capability detection checks only whether `getGamepads` exists. An exception from that API is uncaught. Adapter stop emits disconnected and setup receives it during cleanup; controller identity/selection and mapping reload timing have no integration coverage. | FP-19, FP-22 |
| A09 | P2 / source | Active calibration has no explicit cancel, directions appear as raw English action IDs in the Portuguese capture message, and technical `ButtonN`/`KeyN` values dominate the UI. Device changes reset active capture and preferred device is not carried to practice. | FP-20, FP-24, FP-28 |
| A10 | P2 / gap | There is no lesson reader, fundamentals curriculum, Ken game plan, BnB catalog or instructional media. Six single-motion exercises exist. These are product gaps, not failed implementations of existing routes. | FP-29 through FP-38 |
| A11 | P2 / source-review risk | Progress load, retry queue, sync-in-flight, account changes and deletion use mutable refs and parallel fetches. Need explicit race checks before changing behavior; a delete concurrent with a save could repopulate attempts. HTTP errors including expired session and rate limit are collapsed to generic pending. No destructive live reproduction was run. | FP-23 |
| A12 | P2 / live + source | Only the home has a language switch, and it returns to the home. There is no persistent section navigation, route-preserving language switch or clear distinction between reading, execution and in-game practice. | FP-27, FP-29 |
| A13 | P2 / live + source | `/pt-BR/terms` and `/sign-in` return 404. Terms are not linked in the current app; an unimplemented guessed terms route is not a broken link. The unlocalized `/sign-in` value exists in the local ignored Clerk environment while the actual app routes are localized. Audit the actual Clerk fallback flows before calling this a live auth bug. | FP-39 |
| A14 | P2 / validation gap | The previous auth fix checked redirect parameters but did not complete Google OAuth. Redirect-to-setup return behavior, account transfer, export/deletion webhook and both locales still need end-to-end checks. | FP-39, FP-40 |
| A15 | P2 / source | CI skips the database integration test without `DATABASE_URL` and has no browser or real-controller gate. Passing CI did not exercise calibration and practice together. | FP-40 |

## Non-mutating HTTP sweep

| Request | Status | Interpretation |
| --- | --- | --- |
| `/en`, `/pt-BR`, `/en/privacy`, `/pt-BR/privacy` | 200 | Public pages respond |
| `/pt-BR/setup`, `/pt-BR/practice` without session | 307 | Authentication redirect is present; full destination/callback still needs checking |
| `/api/health` | 200 | Database health query responded |
| `/api/progress`, `/api/progress/export` without session | 401 | Access rejected |
| `/api/cron/retention` without secret | 401 | Access rejected |
| `/pt-BR/terms`, `/sign-in` | 404 | See A13; no invented claim of a broken linked Terms page |

## Reproduction fixtures for future work

The temporary harness was run as `npx tsx C:/Users/Caio/AppData/Local/Temp/fightpath-audit.ts`. It is an investigation artifact outside the repository; the durable fixtures and expected results are recorded here rather than depending on its continued existence.

1. `gamepadSnapshot` with 16 unpressed buttons and axes `[1,0]`: `controls=[]`, normalized right, no bindable control for setup's fresh-control search.
2. Same snapshot with `[0,0,0,0,0,0,1]`: neutral and `controls=[]`, demonstrating unsupported nonstandard axes.
3. `assignControl(defaultMapping('gamepad'), 'LP', 'Button2')`: RangeError; the future product must supply an explicit swap/replace interaction.
4. Mock `Window.navigator.getGamepads()` returning idle pad 0 and pad 1 with button 0 held. Invoke the real adapter's scheduled frame, inspect before `stop`: emitted `controls=[]`.
5. Feed the five A06 samples through the same append / newlyPressed / evaluate / clear sequence as practice. Expect the current bug to produce two attempts; fixed acceptance is one. Repeat with held attacks while changing directions, pausing, clearing, switching exercises and reconnecting.

## Next investigation on the owner's device

After task approval, add a local-only diagnostic panel showing selected input mode, waiting/running state, connected gamepad count and index, standard/nonstandard mapping, live buttons and axes. Reproduce the reported DualSense USB case with the page focused, both D-pad and analog, and the exact selected device recorded. Do not send hardware IDs or raw input history to the server. A physical-device pass requires actual evidence; a synthetic pad test cannot substitute for it.

This audit is bounded, not an assurance that no other bugs exist. FP-40 supplies the broader browser, device, persistence, accessibility and regression pass after the approved changes.
