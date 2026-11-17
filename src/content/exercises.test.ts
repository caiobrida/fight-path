import assert from "node:assert/strict";
import test from "node:test";
import { evaluateCommand } from "@/domain/evaluator";
import { createSample } from "@/domain/input";
import { exercises } from "./exercises";

test("every universal exercise has a working input path and two translations", () => {
  assert.equal(
    new Set(exercises.map((exercise) => exercise.command.id)).size,
    exercises.length,
  );
  for (const exercise of exercises) {
    assert.ok(exercise.title.en && exercise.title["pt-BR"]);
    assert.ok(exercise.goal > 0);
    const history = exercise.command.directions.map((direction, index) =>
      createSample(
        index * 100,
        direction,
        index === exercise.command.directions.length - 1
          ? [exercise.command.attacks[0]]
          : [],
      ),
    );
    assert.equal(
      evaluateCommand(history, exercise.command, "right").correct,
      true,
    );
  }
});
