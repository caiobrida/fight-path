# QA and accessibility matrix

## Expansion regression evidence, November 17, 2026

Current delivery and external gates: [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md). Earlier observations below are historical, not substitutes for physical-device verification.

| Check | Result and boundary |
| --- | --- |
| Local PostgreSQL domain/server/content suite | 48 passed, zero skipped, including revision validation, isolation, idempotency, deletion, signature/expiry/retry and webhook size limits |
| Headless component suite | 19 passed: configure/save/practice, two pads, nonstandard axes, held attacks, touch dragging, storage denial, dialog focus, network/401/429/422/503 recovery and delayed-save deletion |
| Actual Next.js public site | 16 passed: both locales, 18 lesson routes, internal links/assets, protected returns, private endpoint denial and 320/360/390/768/1280px layouts |
| Clerk Development accounts | Passed with two disposable users: setup, reading/check/input persistence, export, deletion and account switching. An acknowledged save response is held across switching, then recovered idempotently under its original owner |
| Real development webhook | Passed: deleting an actual disposable Clerk account removed both its fixture attempts and learning records from Neon; remaining fixture records were zero |
| Automated accessibility | No serious/critical violations in checked home, reader and practice surfaces; Escape restores dialog-trigger focus. This is not screen-reader certification |
| Media and dependency scope | Original SVGs are 639–1143 bytes each; no player request before explicit loading. Production dependency audit reports zero vulnerabilities |

Commands: `node --env-file=.env.local scripts/test.mjs`, `npm run test:browser`, `npm run build`, `npm run test:site`, `npm run test:auth`. CI provisions PostgreSQL 17 and cannot silently skip integration tests. Auth checks are opt-in; no Clerk secret or Neon credential is copied to CI. The loopback-only Vite harness is outside deployable Next.js routes.

Remaining manual evidence: the owner's DualSense USB/Windows 11/Chrome, real Android/iOS multi-touch, screen-reader/200% zoom sessions, Google consent, learner review and six current-game Ken routes with both-side clips. Real mobile loading/input performance is unmeasured. The observed title version 2.0500.001 does not certify battle-build or combo execution. Announce any future desktop/browser/game control before interacting.

## Checked on 2026-11-17

| Surface                              | Coverage                                                                                                | Result                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| In-app Chromium browser, 1280 × 800  | English practice path, controls, feedback, progress and reward structure                                | Passed visual and accessibility-tree inspection                                                  |
| In-app Chromium browser, 360 × 740   | English practice with touch controls                                                                    | Passed; no horizontal overflow                                                                   |
| In-app Chromium browser, 320 × 700   | Touch targets and narrow layout                                                                         | Passed after the directional pad was adapted to one column; touch targets measured at 89 × 44 px |
| In-app Chromium browser, 740 × 360   | Brazilian Portuguese practice and Ken path                                                              | Passed; no horizontal overflow; facing-left command display mirrored                             |
| In-app Chromium browser, 360 × 740   | Brazilian Portuguese control setup                                                                      | Passed visual and accessibility-tree inspection                                                  |
| Keyboard navigation                  | Setup Save to Reset tab transition                                                                      | Passed; Reset received visible solid focus outline                                               |
| Pointer input                        | Dedicated down-right touch control                                                                      | Passed; input history displayed the diagonal direction                                           |
| Local PostgreSQL and server routes   | Progress persistence, export, deletion, session isolation, retry idempotency                            | Passed in FP-14 HTTP checks                                                                      |
| In-app Chromium browser, 320 × 700   | Brazilian Portuguese privacy notice                                                                     | Passed accessibility-tree and overflow inspection                                                |
| Local PostgreSQL after migration 003 | Clerk user ID isolation and discarded anonymous development tables                                      | Passed integration test in FP-18                                                                 |
| Local HTTP without a Clerk session   | Setup and practice redirect to localized sign-in; progress read, write, export, and deletion return 401 | Passed in FP-18                                                                                  |
| Local Chromium browser               | Header sign-in and sign-up from privacy in `en` and `pt-BR`                                             | Force redirects target localized practice; Google OAuth callback still untested                  |

Feedback is written as text in a polite live region. Buttons, select controls, and links have visible focus styles. Directional touch buttons expose localized accessible names. The practice surface does not depend on color alone to report success or failure.
Calculated contrast ratios for representative practice colors are 11.49:1 for muted text on the page background, 10.14:1 for accent text on the page background, and 10.44:1 for white text on control buttons.

## Issues fixed

- A diagonal on touch originally required two simultaneous directional presses. The virtual pad now offers dedicated diagonal buttons.
- The original five-column touch grid could produce narrow targets. The revised pad stacks direction and attack groups at widths up to 352 px.
- Starting sign-up from the privacy page supplied Clerk with both a practice fallback and a privacy-page redirect. The header buttons now force the localized practice destination for sign-in and sign-up, including transfers between those flows.

## Remaining validation

The November 17 product/input investigation is recorded in `AUDIT.md`. Its reproduced defects are proposed work in FP-19 through FP-40, approved for implementation on November 17, 2026. This investigation does not add a physical DualSense pass or a mobile-viewport pass to the matrix above. Do not treat previously passed unit/visual checks as proof that the newly reported setup-to-practice flow works.

- Test a physical gamepad, arcade stick, and leverless controller with the actual browsers and operating systems available to learners. The adapter has unit coverage, but no physical hardware was connected for this matrix.
- Test Android Chrome and iOS Safari on real phones, including multi-touch behavior, orientation changes, and on-screen keyboard interactions.
- Observe a learner completing the universal and Ken paths, then revise unclear language or exercise pacing.
- Verify focus-loss and disconnect recovery with real controllers. Unit behavior is implemented, but browser/device behavior remains unverified.
- Run a screen-reader session with a learner or tester and confirm that status updates are timely without becoming noisy.
- Complete real Clerk sign-in, sign-up, sign-out, and account-switching checks in both locales on a desktop and phone. Configure and test the signed account-deletion webhook in deployed environments.

These items gate public release. Record device model, browser version, operating system, findings, and fixes when each run is performed.
