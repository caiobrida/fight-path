# FightPath product brief

## Vision and audience

FightPath is a gamified web platform for people learning fighting games. It helps a learner practice inputs deliberately, understand mistakes, and see improvement over time. The first experience focuses on Street Fighter 6, Ken, and Classic controls. The name and structure are intentionally broader than a Ken-only tutorial so future characters and games can be added.

The intended learner may use a keyboard, console controller, arcade stick, leverless controller, or a touch interface. Browser support varies by device and operating system; the product must show what it can detect and let the learner map inputs where possible.

## Confirmed product constraints

- The product supports English and Brazilian Portuguese from the beginning.
- The experience is responsive and mobile first, with comfortable practice in a desktop browser and on a phone.
- Universal command practice and character-specific practice are distinct learning areas.
- The initial character content is Ken with Classic controls in Street Fighter 6.
- The interactive simulator should display captured inputs and explain accepted or rejected attempts.
- Progress and gamification should reflect practice and skill development.
- Game-specific information shown to learners must come from real, reputable sources, preferably official ones.
- PostgreSQL on Neon is the planned database; Vercel is the planned hosting platform.
- An account is required to configure controls, practice, and save progress. Clerk handles sign-in and accounts through the existing `fight-path` application. The home page and privacy notice remain public.

## Proposed learning experience

1. Choose a language, input device, and learning activity.
2. Map the physical controls to game actions when automatic identification is insufficient.
3. See a target input sequence and practice it. The interface shows direction and button history in real time.
4. Receive feedback about order, missing directions, wrong buttons, or timing against FightPath's published validation rules.
5. Repeat the exercise, review accuracy and consistency, and continue along a learning path.

The **universal practice area** teaches reusable movement and button patterns. The **character area** connects verified Ken Classic content to those patterns. A broader **fundamentals area** covering topics such as spacing, defense, and reactions was proposed in the earlier conversation and is future scope.

## Initial release candidate

The first release proves one complete learning loop: create an account, configure an input method, practice three universal and three source-backed Ken Classic commands, receive understandable feedback in both languages, and see account-bound progress. The supported physical-device matrix and learner validation remain open in FP-08, FP-12, FP-13, and FP-16.

The learning loop must remain usable on narrow touch screens and on larger desktop layouts. Device setup, input history, and feedback need room to remain readable without relying on hover or precise pointer input.

The initial simulator evaluates input sequences and rhythm. It does not claim to recreate Street Fighter 6's combat engine or establish whether a move or combo would succeed in the game. Any stronger claim requires researched rules and validation against the game.

## Progress and motivation

The first release shows attempts, correct attempts, accuracy, and per-exercise mastery. Mastery is based on the latest 20 saved attempts: Building requires 3 correct attempts and at least 50% recent accuracy; Confident requires 10 correct attempts and at least 70% recent accuracy over at least 10 attempts. Each of the first 10 correct attempts per exercise grants 10 XP. Six exercises cap XP at 600, and each 100 XP adds one level. Three challenges reward correct attempts in universal and Ken exercises. These rewards are private practice feedback based on saved, client-reported results; they are not a competitive ranking. Streaks and achievements are deferred until their behavior can be designed with learners.

## Later opportunities

### Proposed learning expansion under owner review

On November 17, 2026 the owner requested research and task planning for a more complete learning product. The owner approved FP-19 through FP-40 on November 17, 2026. The proposed areas are Learn (foundations, neutral/footsies, SF6 systems and practice habits), Ken Classic (a beginner game plan and dependable BnBs) and Practice (reliable input exercises with guided controller setup). Preserve both languages and the dark/orange palette while developing a coherent mobile-first design system with purposeful imagery. `AUDIT.md`, `DESIGN-STUDY.md` and `RESEARCH-CONTENT.md` contain the evidence and proposal.

The first proposed BnB feature is a verified reference and in-game practice guide. Reading, a self-reported drill and a browser input match are different learning activities. Exact combos, damage and patch-dependent advice remain unpublished until sources and current-game execution are checked. The reported DualSense USB issue and duplicate-attempt defect take priority over adding execution complexity.

### Other future opportunities

- More Street Fighter 6 characters, control schemes, and eventually other fighting games.
- Practice modes for side switching, memory, reaction, and increasing difficulty.
- Combo sequence practice with a clearly stated level of fidelity.
- Broader fighting-game fundamentals and personalized exercises based on observed weaknesses.

## Open product decisions

| Decision                                               | Current status                                                                                                                | Owner task          |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Exact first-release exercise list and success criteria | Three universal and three sourced Ken exercises implemented; learner review pending                                           | FP-02, FP-12, FP-13 |
| Required devices and browsers for the first release    | Open; test availability and compatibility                                                                                     | FP-08, FP-16        |
| Accounts versus anonymous progress                     | Clerk account required; anonymous development progress is discarded during the schema change because no real learners used it | FP-18               |
| Progress and reward formulas                           | Initial formulas implemented; validate motivation with learners                                                               | FP-14, FP-15        |
| Visual style and onboarding details                    | Open; validate with learners                                                                                                  | FP-11, FP-16        |
