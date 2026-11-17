import assert from "node:assert/strict";
import test from "node:test";
import { createSample, type Facing } from "./input";
import { evaluateCommand, type CommandDefinition } from "./evaluator";

const quarterCircle: CommandDefinition = {
  id: "quarter-circle-forward-punch",
  directions: ["down", "down-right", "right"],
  attacks: ["LP", "MP", "HP"],
  maxDurationMs: 900,
  maxGapMs: 450,
};

function attempt(
  directions: readonly string[],
  button = "LP",
  gap = 100,
  facing: Facing = "right",
) {
  const mirrored =
    facing === "left"
      ? directions.map((direction) =>
          direction
            .replace("right", "temp")
            .replace("left", "right")
            .replace("temp", "left"),
        )
      : directions;
  return mirrored.map((direction, index) =>
    createSample(
      index * gap,
      direction as ReturnType<typeof createSample>["direction"],
      index === mirrored.length - 1 ? [button as "LP"] : [],
    ),
  );
}

test("accepts correct inputs on both sides", () => {
  const directions = ["down", "down-right", "right"];
  assert.equal(
    evaluateCommand(attempt(directions), quarterCircle, "right").correct,
    true,
  );
  assert.equal(
    evaluateCommand(
      attempt(directions, "LP", 100, "left"),
      quarterCircle,
      "left",
    ).correct,
    true,
  );
});

test("explains missing diagonal and wrong button", () => {
  assert.deepEqual(
    evaluateCommand(attempt(["down", "right"]), quarterCircle, "right"),
    {
      correct: false,
      reason: "missing-direction",
      missingDirection: "down-right",
    },
  );
  assert.equal(
    evaluateCommand(
      attempt(["down", "down-right", "right"], "LK"),
      quarterCircle,
      "right",
    ).reason,
    "wrong-button",
  );
});

test("rejects slow inputs and incomplete attempts", () => {
  assert.equal(
    evaluateCommand(
      attempt(["down", "down-right", "right"], "LP", 600),
      quarterCircle,
      "right",
    ).reason,
    "too-slow",
  );
  assert.equal(
    evaluateCommand([createSample(0, "down", [])], quarterCircle, "right")
      .reason,
    "incomplete",
  );
});
