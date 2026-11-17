# FightPath architecture outline

## Status

The application uses Next.js App Router with React and TypeScript. This keeps the web UI and server routes in one project, supports Vercel deployment, and allows Neon credentials to remain server-side. The input evaluator remains framework-independent. Vite was suggested earlier, but a separate server would add complexity for the required database access.

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

The normalized domain now uses timestamped snapshots of a direction and held attack buttons. It quantizes analog axes with a dead zone, mirrors left/right orientation, retains ordered state changes, and detects button press edges. It does not depend on React or a particular controller.
Device adapters must emit a neutral, button-free sample on focus loss or disconnection so an interrupted attempt cannot leave a control logically held. FP-08 owns that browser behavior.

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

Device adapters emit raw control tokens and quantized axes. FP-09 will map those tokens to normalized game inputs. Keyboard capture uses an allowlist and ignores typing fields; raw device identifiers and raw input histories are not sent to the server.

The practice UI is mobile first and responsive. Layouts should start with a narrow viewport, then adapt to larger screens while preserving visible controls, readable input history, and accessible touch targets. Keyboard and physical gamepad flows must remain usable on desktop. FP-11 implements the flow; FP-16 verifies actual device and viewport behavior.

## Content and localization

UI messages, exercise instructions, and feedback need `en` and `pt-BR` versions. Translation keys and source data should make missing translations detectable. Game content must retain source URL, access date, and applicable version or patch when relevant. A game fact and an evaluator threshold are different data: the former needs game evidence; the latter needs an explicit FightPath rule and testing.

Locale routes use `/en` and `/pt-BR`. A lightweight Next.js Proxy redirects `/` using a saved locale cookie or the browser language. The dictionary type keeps both current translations aligned; future lesson data should use the same locale keys. The locale layout sets the HTML language for assistive technology.

Universal exercises should refer to reusable input patterns. Ken lessons may refer to those patterns while adding sourced, character-specific context. Adding another character should add content and definitions without changing device capture. Adding another game may require a new command dialect or evaluator rule; that boundary remains subject to prototype evidence.

## Data and deployment

Neon PostgreSQL is the planned durable store for progress. A local PostgreSQL 17 container supplies the same SQL development target. The browser must not connect with a privileged database credential. Next.js server routes will use `DATABASE_URL` from the environment and parameterized queries.

The first identity model is an anonymous, random session token held in an HttpOnly, SameSite cookie. The database stores only a SHA-256 token hash. Attempts belong to the server-resolved session; the client cannot choose a session ID. Losing the cookie loses access to that progress. The production service must offer export and deletion, and should not store raw input histories. The current migration contains only sessions and minimal attempt outcomes. FP-14 implements these flows.

There is no profile or email table in the anonymous MVP. Locale and controller mapping stay on the device. Mastery and lesson progress are derived from stored attempt outcomes, so no duplicate score state is required initially.

Control mappings may be stored on the device initially; syncing them to an account is an open product decision. Raw input histories should be retained only if needed for an explicit feature, with a defined retention period. Preview and production must have separate configuration and database access when deployment is prepared in FP-17.

## Simulator limits and quality

Browser polling, event timing, device mappings, and operating-system behavior can differ from Street Fighter 6. Initial feedback means an input sequence satisfied FightPath's documented rules. It does not mean the move or combo would execute in the game. FP-10 should make thresholds inspectable and test both facing directions. FP-16 should record the device and browser combinations actually tested.

CI should check formatting or lint, types, relevant tests, and build on PRs once FP-03 creates the project. FP-04 adds that gate before broader feature work is merged.

## Decisions still open

| Decision | Why it matters | Resolve in |
| --- | --- | --- |
| Frontend and server stack | Next.js App Router selected; specific database and identity libraries remain open | FP-03, FP-06 |
| Account or anonymous identity | Anonymous cookie session selected for the first release; account linking remains future scope | FP-06 |
| First command representation and tolerance rules | Determines what the simulator can claim | FP-07, FP-10 |
| Supported hardware matrix | Depends on browser and device behavior | FP-08, FP-16 |
| Stored attempt detail and retention | Balances metrics with data minimization | FP-06, FP-14 |
| Game content update procedure | Keeps lessons correct across game patches | FP-02 |
