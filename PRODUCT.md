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

## Proposed learning experience

1. Choose a language, input device, and learning activity.
2. Map the physical controls to game actions when automatic identification is insufficient.
3. See a target input sequence and practice it. The interface shows direction and button history in real time.
4. Receive feedback about order, missing directions, wrong buttons, or timing against FightPath's published validation rules.
5. Repeat the exercise, review accuracy and consistency, and continue along a learning path.

The **universal practice area** teaches reusable movement and button patterns. The **character area** connects verified Ken Classic content to those patterns. A broader **fundamentals area** covering topics such as spacing, defense, and reactions was proposed in the earlier conversation and is future scope.

## Initial release candidate

The first release should prove one complete learning loop: configure an input method, practice a small verified set of universal and Ken-specific commands, receive understandable feedback in both languages, and see saved progress. FP-01 records this as a candidate boundary; the exact number of exercises, supported device matrix, identity model, and progress rules still require decisions in FP-02, FP-06, FP-12, FP-13, and FP-15.

The learning loop must remain usable on narrow touch screens and on larger desktop layouts. Device setup, input history, and feedback need room to remain readable without relying on hover or precise pointer input.

The initial simulator evaluates input sequences and rhythm. It does not claim to recreate Street Fighter 6's combat engine or establish whether a move or combo would succeed in the game. Any stronger claim requires researched rules and validation against the game.

## Progress and motivation

The first release shows attempts, correct attempts, accuracy, and per-exercise mastery. Mastery is based on the latest 20 saved attempts: Building requires 3 correct attempts and at least 50% recent accuracy; Confident requires 10 correct attempts and at least 70% recent accuracy over at least 10 attempts. Each of the first 10 correct attempts per exercise grants 10 XP. Six exercises cap XP at 600, and each 100 XP adds one level. Three challenges reward correct attempts in universal and Ken exercises. These rewards are private practice feedback based on saved, client-reported results; they are not a competitive ranking. Streaks and achievements are deferred until their behavior can be designed with learners.

## Later opportunities

- More Street Fighter 6 characters, control schemes, and eventually other fighting games.
- Practice modes for side switching, memory, reaction, and increasing difficulty.
- Combo sequence practice with a clearly stated level of fidelity.
- Broader fighting-game fundamentals and personalized exercises based on observed weaknesses.

## Open product decisions

| Decision | Current status | Owner task |
| --- | --- | --- |
| Exact first-release exercise list and success criteria | Open; must be source-backed | FP-02, FP-12, FP-13 |
| Required devices and browsers for the first release | Open; test availability and compatibility | FP-08, FP-16 |
| Accounts versus anonymous progress | Open; determines cross-device persistence | FP-06 |
| Progress and reward formulas | Initial formulas implemented; validate motivation with learners | FP-14, FP-15 |
| Visual style and onboarding details | Open; validate with learners | FP-11, FP-16 |
