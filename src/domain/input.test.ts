import assert from "node:assert/strict";
import test from "node:test";
import {
  appendSample,
  createSample,
  newlyPressed,
  quantizeAxis,
  relativeDirection,
  resolveDirection,
} from "./input";

test("resolves analog noise and diagonals", () => {
  assert.equal(quantizeAxis(0.2), 0);
  assert.equal(resolveDirection(0.8, 0.7), "down-right");
  assert.equal(resolveDirection(-1, -1), "up-left");
  assert.throws(() => quantizeAxis(Number.NaN), RangeError);
});

test("mirrors directions when facing left", () => {
  assert.equal(relativeDirection("down-right", "left"), "down-left");
  assert.equal(relativeDirection("right", "left"), "left");
  assert.equal(relativeDirection("down", "left"), "down");
});

test("keeps ordered changes and detects button edges", () => {
  const neutral = createSample(0, "neutral", []);
  const first = createSample(30, "down", ["HP", "LP", "LP"]);
  const held = createSample(50, "down-right", ["LP", "HP"]);
  assert.deepEqual(first.buttons, ["LP", "HP"]);
  assert.deepEqual(newlyPressed(neutral, first), ["LP", "HP"]);
  assert.deepEqual(newlyPressed(first, held), []);
  const history = appendSample(appendSample([neutral], first), held);
  assert.equal(history.length, 3);
  assert.equal(appendSample(history, held), history);
  assert.throws(
    () => appendSample(history, createSample(20, "up", [])),
    RangeError,
  );
});
