# FightPath architecture outline

## Status

This document records the target boundaries and open technical decisions before implementation. No application stack or database schema has been implemented yet. React, TypeScript, and Vite were suggested in the earlier conversation, but FP-03 must evaluate and confirm the stack, including the server runtime needed for Neon and Vercel.

## System boundaries

```text
Keyboard / Gamepad / Touch
          ↓
Device adapters and configurable mappings
          ↓
Normalized, timestamped input events
          ↓
Command evaluator + versioned command definitions
          ↓
Attempt result and specific feedback
          ↓
Practice UI → Progress service → Server API → Neon PostgreSQL
```

The input model and evaluator should run independently of the UI framework and browser device APIs. Device adapters translate raw events into the same representation; content supplies command definitions; the evaluator returns deterministic results. This permits tests with synthetic input histories and later reuse across characters or games.

## Proposed modules

| Boundary | Responsibility | Task |
| --- | --- | --- |
| Device adapters | Capture keyboard, Gamepad API, and touch events; handle connection and focus | FP-08 |
| Control mapping | Associate physical inputs with directions and attack buttons; support manual calibration | FP-09 |
| Input domain | Represent direction, buttons, orientation, simultaneity, and timestamps | FP-07 |
| Command evaluator | Match events to command definitions and produce reasoned results | FP-10 |
| Content catalog | Store universal exercises and sourced, localized character lessons | FP-02, FP-12, FP-13 |
| Practice UI | Show challenge, input history, feedback, and recovery states | FP-05, FP-11 |
| Progress domain | Compute attempts, mastery, and optional rewards | FP-14, FP-15 |
| Server and data | Authenticate or identify sessions, authorize data access, store progress | FP-06, FP-14 |

This is a responsibility map, not a required folder structure. FP-03 will choose code organization after confirming the stack.

## Content and localization

UI messages, exercise instructions, and feedback need `en` and `pt-BR` versions. Translation keys and source data should make missing translations detectable. Game content must retain source URL, access date, and applicable version or patch when relevant. A game fact and an evaluator threshold are different data: the former needs game evidence; the latter needs an explicit FightPath rule and testing.

Universal exercises should refer to reusable input patterns. Ken lessons may refer to those patterns while adding sourced, character-specific context. Adding another character should add content and definitions without changing device capture. Adding another game may require a new command dialect or evaluator rule; that boundary remains subject to prototype evidence.

## Data and deployment

Neon PostgreSQL is the planned durable store for progress. The browser must not connect with a privileged database credential. A server boundary compatible with Vercel will validate identity, authorize requests, and use database credentials stored in environment configuration. FP-06 decides the identity model, data minimization, migrations, and server framework before FP-14 implements persistence.

Control mappings may be stored on the device initially; syncing them to an account is an open product decision. Raw input histories should be retained only if needed for an explicit feature, with a defined retention period. Preview and production must have separate configuration and database access when deployment is prepared in FP-17.

## Simulator limits and quality

Browser polling, event timing, device mappings, and operating-system behavior can differ from Street Fighter 6. Initial feedback means an input sequence satisfied FightPath's documented rules. It does not mean the move or combo would execute in the game. FP-10 should make thresholds inspectable and test both facing directions. FP-16 should record the device and browser combinations actually tested.

CI should check formatting or lint, types, relevant tests, and build on PRs once FP-03 creates the project. FP-04 adds that gate before broader feature work is merged.

## Decisions still open

| Decision | Why it matters | Resolve in |
| --- | --- | --- |
| Frontend and server stack | Determines routing, server boundary, and Vercel integration | FP-03, FP-06 |
| Account or anonymous identity | Determines ownership and synchronization of progress | FP-06 |
| First command representation and tolerance rules | Determines what the simulator can claim | FP-07, FP-10 |
| Supported hardware matrix | Depends on browser and device behavior | FP-08, FP-16 |
| Stored attempt detail and retention | Balances metrics with data minimization | FP-06, FP-14 |
| Game content update procedure | Keeps lessons correct across game patches | FP-02 |
