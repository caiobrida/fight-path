import assert from "node:assert/strict";
import test from "node:test";
import {
  assignControl,
  defaultMapping,
  loadMapping,
  mapRaw,
  saveMapping,
} from "./mapping";
import { rawSnapshot } from "@/devices/raw";

test("maps keyboard and gamepad controls to shared inputs", () => {
  const keyboard = mapRaw(
    rawSnapshot("keyboard", 10, true, ["ArrowDown", "ArrowRight", "KeyJ"]),
    defaultMapping("keyboard"),
  );
  const gamepad = mapRaw(
    rawSnapshot("gamepad", 10, true, ["Button13", "Button15", "Button0"]),
    defaultMapping("gamepad"),
  );
  assert.equal(keyboard.direction, "down-right");
  assert.deepEqual(keyboard.buttons, ["LP"]);
  assert.deepEqual(gamepad, keyboard);
});

test("uses analog axes when no digital direction is held", () => {
  const result = mapRaw(
    rawSnapshot("gamepad", 20, true, ["Button2"], -1, 1),
    defaultMapping("gamepad"),
  );
  assert.equal(result.direction, "down-left");
  assert.deepEqual(result.buttons, ["HP"]);
});

test("rejects duplicate assignments and invalid saved data", () => {
  const mapping = defaultMapping("keyboard");
  assert.throws(() => assignControl(mapping, "LP", "KeyK"), RangeError);
  const updated = assignControl(mapping, "LP", "KeyP");
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
  };
  saveMapping(storage, "keyboard", updated);
  assert.equal(loadMapping(storage, "keyboard").LP, "KeyP");
  values.set("fightpath-mapping-v1-keyboard", "invalid json");
  assert.equal(loadMapping(storage, "keyboard").LP, "KeyJ");
});
