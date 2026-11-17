# QA and accessibility matrix

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

Feedback is written as text in a polite live region. Buttons, select controls, and links have visible focus styles. Directional touch buttons expose localized accessible names. The practice surface does not depend on color alone to report success or failure.
Calculated contrast ratios for representative practice colors are 11.49:1 for muted text on the page background, 10.14:1 for accent text on the page background, and 10.44:1 for white text on control buttons.

## Issues fixed

- A diagonal on touch originally required two simultaneous directional presses. The virtual pad now offers dedicated diagonal buttons.
- The original five-column touch grid could produce narrow targets. The revised pad stacks direction and attack groups at widths up to 352 px.

## Remaining validation

- Test a physical gamepad, arcade stick, and leverless controller with the actual browsers and operating systems available to learners. The adapter has unit coverage, but no physical hardware was connected for this matrix.
- Test Android Chrome and iOS Safari on real phones, including multi-touch behavior, orientation changes, and on-screen keyboard interactions.
- Observe a learner completing the universal and Ken paths, then revise unclear language or exercise pacing.
- Verify focus-loss and disconnect recovery with real controllers. Unit behavior is implemented, but browser/device behavior remains unverified.
- Run a screen-reader session with a learner or tester and confirm that status updates are timely without becoming noisy.
- Complete real Clerk sign-in, sign-up, sign-out, and account-switching checks in both locales on a desktop and phone. Configure and test the signed account-deletion webhook in deployed environments.

These items gate public release. Record device model, browser version, operating system, findings, and fixes when each run is performed.
