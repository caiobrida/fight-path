import assert from "node:assert/strict";
import test from "node:test";
import { defaultMapping, mapRaw } from "@/domain/mapping";
import { touchSnapshot } from "./touch";

test("dedicated diagonal touch controls produce one directional input", () => {
  const mapping = defaultMapping("touch");
  const downRight = mapRaw(
    touchSnapshot(100, ["TouchDownRight", "TouchLP"]),
    mapping,
  );
  const downLeft = mapRaw(touchSnapshot(200, ["TouchDownLeft"]), mapping);
  assert.equal(downRight.direction, "down-right");
  assert.deepEqual(downRight.buttons, ["LP"]);
  assert.equal(downLeft.direction, "down-left");
});
