import assert from "node:assert/strict";
import test from "node:test";
import { AttemptWindow } from "./attempt-window";
import { createSample } from "./input";
import { evaluateCommand } from "./evaluator";
import { exercises } from "@/content/exercises";

test("a held attack during direction release creates only one attempt", () => {
  const window = new AttemptWindow();
  const samples = [
    createSample(0, "down", []),
    createSample(50, "down-right", []),
    createSample(100, "right", ["LP"]),
    createSample(120, "neutral", ["LP"]),
    createSample(150, "neutral", []),
  ];
  const attempts = samples.flatMap((sample) => {
    const history = window.observe(sample);
    return history
      ? [evaluateCommand(history, exercises[0].command, "right")]
      : [];
  });
  assert.equal(attempts.length, 1);
  assert.equal(attempts[0].correct, true);
  assert.notEqual(window.observe(createSample(200, "neutral", ["LP"])), null);
});

test("clear preserves held state and reconnect waits for a fresh press", () => {
  const window = new AttemptWindow();
  assert.equal(window.observe(createSample(0, "right", ["HP"])), null);
  window.clear();
  assert.equal(window.observe(createSample(10, "down", ["HP"])), null);
  window.disconnect();
  assert.equal(window.observe(createSample(20, "right", ["HP"])), null);
  window.observe(createSample(30, "neutral", []));
  assert.notEqual(window.observe(createSample(40, "neutral", ["HP"])), null);
});
