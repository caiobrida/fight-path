import assert from "node:assert/strict";
import test from "node:test";
import { evaluateCommand } from "@/domain/evaluator";
import { createSample, relativeDirection } from "@/domain/input";
import { exercises, kenExercises } from "./exercises";

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

test("Ken Classic lessons are sourced and work on both sides", () => {
  assert.equal(kenExercises.length, 3);
  for (const exercise of kenExercises) {
    assert.equal(exercise.source?.id, "CAPCOM-KEN-MOVES");
    assert.ok(exercise.title.en && exercise.title["pt-BR"]);
    assert.ok(exercise.description?.en && exercise.description["pt-BR"]);
    for (const facing of ["right", "left"] as const) {
      const history = exercise.command.directions.map((direction, index) =>
        createSample(
          index * 100,
          relativeDirection(direction, facing),
          index === exercise.command.directions.length - 1
            ? [exercise.command.attacks[0]]
            : [],
        ),
      );
      assert.equal(
        evaluateCommand(history, exercise.command, facing).correct,
        true,
      );
    }
  }
});
