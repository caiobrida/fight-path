import assert from "node:assert/strict";
import test from "node:test";
import { rawSnapshot, sameRawState } from "./raw";
import { gamepadSnapshot } from "./gamepad";

test("sorts and deduplicates raw controls", () => {
  const first = rawSnapshot("keyboard", 1, true, ["KeyJ", "ArrowDown", "KeyJ"]);
  const second = rawSnapshot("keyboard", 2, true, ["ArrowDown", "KeyJ"]);
  assert.deepEqual(first.controls, ["ArrowDown", "KeyJ"]);
  assert.equal(sameRawState(first, second), true);
});

test("samples gamepad buttons and axes without a device identity", () => {
  const gamepad = {
    buttons: [{ pressed: true }, { pressed: false }],
    axes: [0.8, -0.9],
  } as unknown as Gamepad;
  const result = gamepadSnapshot(gamepad, 12);
  assert.equal(result.horizontal, 1);
  assert.equal(result.vertical, -1);
  assert.deepEqual(result.controls, ["Axis0+", "Axis1-", "Button0"]);
  assert.equal(gamepadSnapshot(null, 13).connected, false);
});
