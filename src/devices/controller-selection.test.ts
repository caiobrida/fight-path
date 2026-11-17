import assert from "node:assert/strict";
import test from "node:test";
import { activeController, readControllers } from "./controller-selection";

test("an idle first controller does not prevent selecting the second", () => {
  const first = { index: 0, connected: true } as Gamepad;
  const second = { index: 2, connected: true } as Gamepad;
  assert.equal(activeController([first, second], 2), second);
  assert.equal(activeController([first], 2), null);
  assert.equal(activeController([first, second]), first);
});

test("controller discovery handles sparse slots and reports denied access", () => {
  const pad = { index: 1, connected: true } as Gamepad;
  const target = {
    navigator: { getGamepads: () => [null, pad] },
  } as unknown as Window;
  assert.deepEqual(readControllers(target), [pad]);
  const blocked = {
    navigator: {
      getGamepads() {
        throw new Error("denied");
      },
    },
  } as unknown as Window;
  assert.throws(() => readControllers(blocked), /denied/);
});
