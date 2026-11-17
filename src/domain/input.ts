export const attacks = ["LP", "MP", "HP", "LK", "MK", "HK"] as const;

export type Attack = (typeof attacks)[number];
export type Facing = "left" | "right";
export type Direction =
  | "neutral"
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

export type InputSample = Readonly<{
  atMs: number;
  direction: Direction;
  buttons: readonly Attack[];
}>;

const directions: Record<string, Direction> = {
  "0,0": "neutral",
  "0,-1": "up",
  "0,1": "down",
  "-1,0": "left",
  "1,0": "right",
  "-1,-1": "up-left",
  "1,-1": "up-right",
  "-1,1": "down-left",
  "1,1": "down-right",
};

export function quantizeAxis(value: number, deadZone = 0.4): -1 | 0 | 1 {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(deadZone) ||
    deadZone < 0 ||
    deadZone >= 1
  ) {
    throw new RangeError("Invalid axis value or dead zone");
  }

  if (value <= -deadZone) return -1;
  if (value >= deadZone) return 1;
  return 0;
}

export function resolveDirection(
  horizontal: number,
  vertical: number,
  deadZone = 0.4,
): Direction {
  const x = quantizeAxis(horizontal, deadZone);
  const y = quantizeAxis(vertical, deadZone);
  return directions[`${x},${y}`];
}

export function relativeDirection(
  direction: Direction,
  facing: Facing,
): Direction {
  if (facing === "right") return direction;
  if (direction === "left") return "right";
  if (direction === "right") return "left";
  if (direction.endsWith("-left"))
    return direction.replace("-left", "-right") as Direction;
  if (direction.endsWith("-right"))
    return direction.replace("-right", "-left") as Direction;
  return direction;
}

export function createSample(
  atMs: number,
  direction: Direction,
  buttons: readonly Attack[],
): InputSample {
  if (!Number.isFinite(atMs) || atMs < 0)
    throw new RangeError("Invalid timestamp");
  const uniqueButtons = [...new Set(buttons)];
  if (uniqueButtons.some((button) => !attacks.includes(button)))
    throw new RangeError("Invalid attack button");
  uniqueButtons.sort(
    (left, right) => attacks.indexOf(left) - attacks.indexOf(right),
  );
  return { atMs, direction, buttons: uniqueButtons };
}

export function appendSample(
  history: readonly InputSample[],
  sample: InputSample,
  maximum = 120,
): readonly InputSample[] {
  if (!Number.isInteger(maximum) || maximum < 1)
    throw new RangeError("Invalid history limit");
  const previous = history.at(-1);
  if (previous && sample.atMs < previous.atMs)
    throw new RangeError("Input timestamps must be ordered");
  if (
    previous &&
    previous.direction === sample.direction &&
    previous.buttons.join() === sample.buttons.join()
  )
    return history;
  return [...history, sample].slice(-maximum);
}

export function newlyPressed(
  previous: InputSample | undefined,
  current: InputSample,
): readonly Attack[] {
  const held = new Set(previous?.buttons ?? []);
  return current.buttons.filter((button) => !held.has(button));
}
