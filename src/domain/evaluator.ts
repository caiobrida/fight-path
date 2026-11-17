import {
  newlyPressed,
  relativeDirection,
  type Attack,
  type Direction,
  type Facing,
  type InputSample,
} from "./input";

export type CommandDefinition = Readonly<{
  id: string;
  directions: readonly Direction[];
  attacks: readonly Attack[];
  maxDurationMs: number;
  maxGapMs: number;
}>;

export type EvaluationReason =
  | "incomplete"
  | "wrong-button"
  | "missing-direction"
  | "wrong-order"
  | "button-early"
  | "too-slow"
  | "extra-direction";

export type Evaluation = Readonly<{
  correct: boolean;
  reason: EvaluationReason | null;
  missingDirection?: Direction;
  durationMs?: number;
}>;

type DirectionEvent = Readonly<{ direction: Direction; atMs: number }>;

function directionEvents(
  samples: readonly InputSample[],
  facing: Facing,
): DirectionEvent[] {
  const result: DirectionEvent[] = [];
  for (const sample of samples) {
    const direction = relativeDirection(sample.direction, facing);
    if (direction !== "neutral" && result.at(-1)?.direction !== direction)
      result.push({ direction, atMs: sample.atMs });
  }
  return result;
}

export function evaluateCommand(
  history: readonly InputSample[],
  command: CommandDefinition,
  facing: Facing,
): Evaluation {
  if (
    !command.directions.length ||
    !command.attacks.length ||
    command.maxDurationMs <= 0 ||
    command.maxGapMs <= 0
  ) {
    throw new RangeError("Invalid command definition");
  }

  const attackIndex = history.findLastIndex(
    (sample, index) => newlyPressed(history[index - 1], sample).length > 0,
  );
  if (attackIndex < 0) return { correct: false, reason: "incomplete" };

  const attackSample = history[attackIndex];
  const pressed = newlyPressed(history[attackIndex - 1], attackSample);
  if (!pressed.some((button) => command.attacks.includes(button)))
    return { correct: false, reason: "wrong-button" };

  const events = directionEvents(history.slice(0, attackIndex + 1), facing);
  const expected = command.directions;
  const actual = events.slice(-expected.length);
  const hasExactSequence =
    actual.length === expected.length &&
    actual.every((event, index) => event.direction === expected[index]);

  if (!hasExactSequence) {
    const observed = events.map((event) => event.direction);
    const missing = expected.find((direction) => !observed.includes(direction));
    if (missing)
      return {
        correct: false,
        reason: "missing-direction",
        missingDirection: missing,
      };
    if (
      observed.at(-1) !== expected.at(-1) &&
      observed.slice(-1)[0] === expected.at(-2)
    )
      return { correct: false, reason: "button-early" };
    if (observed.length > expected.length)
      return { correct: false, reason: "extra-direction" };
    return { correct: false, reason: "wrong-order" };
  }

  const durationMs = attackSample.atMs - actual[0].atMs;
  if (durationMs > command.maxDurationMs)
    return { correct: false, reason: "too-slow", durationMs };
  for (let index = 1; index < actual.length; index += 1) {
    if (actual[index].atMs - actual[index - 1].atMs > command.maxGapMs)
      return { correct: false, reason: "too-slow", durationMs };
  }
  if (attackSample.atMs - actual.at(-1)!.atMs > command.maxGapMs)
    return { correct: false, reason: "too-slow", durationMs };
  return { correct: true, reason: null, durationMs };
}
