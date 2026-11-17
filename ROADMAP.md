# FightPath roadmap

The roadmap groups the task files in [`TASKS.md`](TASKS.md) into reviewable milestones. It contains dependencies and exit criteria, not dates or a promise of a particular release schedule. The project owner has authorized implementation of all listed tasks. Public release remains a separate decision after the external configuration and real-device validation gates.

## 0. Shared product context

**Tasks:** FP-01, FP-02.

Produce the product, architecture, roadmap, and project instruction files. Then establish the catalog and review policy for Street Fighter 6 content.

**Exit criteria:** another developer can identify confirmed constraints, open decisions, and the source for each game fact intended for the first lessons.

## 1. Technical foundation

**Tasks:** FP-03, FP-04, FP-05, FP-06.

Choose the frontend and server stack, create a responsive mobile-first repository baseline, add PR CI early, prepare both languages, and decide identity and secure Neon access.

**Exit criteria:** the application builds, required checks run on a PR, both locales work in the basic mobile-first shell, and the data flow has no browser-held database secret.

## 2. Input practice engine

**Tasks:** FP-07, FP-08, FP-09, FP-10, FP-11.

Create normalized input events, device adapters, manual mapping, deterministic command evaluation, and the practice interface.

**Exit criteria:** a learner can configure an available device, attempt a command, see an input history, and receive understandable feedback in both languages on phone and desktop layouts. Supported devices and simulator limits are explicit.

## 3. First learning paths

**Tasks:** FP-12, FP-13.

Add a short universal execution path and the first verified Ken Classic path. Keep sourced game content separate from evaluator rules.

**Exit criteria:** each path has a usable beginning and end; instructions exist in `en` and `pt-BR`; game-specific claims are traceable to FP-02 sources.

## 4. Lasting progress

**Tasks:** FP-14, FP-15.

Store practice results in Neon using the identity model from FP-06, display growth by skill, and introduce a small set of rewards tied to actual attempts.

**Exit criteria:** the learner's progress survives according to the chosen identity model, is isolated from others, and reward calculations are understandable and testable.

## 5. Release readiness

**Tasks:** FP-16, FP-17, FP-18.

Test accessibility and the declared device/browser matrix, prepare Vercel preview and release configuration, and require Clerk accounts for setup, practice, and progress. Discard old anonymous development data. Configure the selected `fight-path` Clerk application and signed account-deletion webhook before public release.

**Exit criteria:** core flows pass the recorded matrix, important limitations are documented, CI passes, unauthorized users cannot access practice or progress, and a preview can be reviewed without committing secrets. Production publication is a separate decision.

## After the first release

Candidates include more characters and games, Modern controls, broader fighting-game fundamentals, reaction and memory modes, and more faithful combo validation. Create new task files only after deciding what feedback or evidence justifies the next slice.
