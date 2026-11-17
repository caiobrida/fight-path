import assert from "node:assert/strict";
import test from "node:test";
import { exercises, kenExercises } from "@/content/exercises";
import { gamification, mastery } from "./gamification";
import type { ProgressRow } from "./progress";

function row(
  exerciseId: string,
  correct: number,
  attempts = correct,
): ProgressRow {
  return {
    exerciseId,
    correct,
    attempts,
    recentAttempts: Math.min(attempts, 20),
    recentCorrect: Math.min(correct, 20),
  };
}

test("XP is capped and missions require all matching exercises", () => {
  const first = exercises[0].command.id;
  const partial = gamification([row(first, 100)]);
  assert.equal(partial.xp, 100);
  assert.equal(partial.level, 2);
  assert.equal(partial.missions[0].complete, true);
  assert.equal(partial.missions[1].complete, false);

  const complete = gamification(
    [...exercises, ...kenExercises].map((exercise) =>
      row(exercise.command.id, 100),
    ),
  );
  assert.equal(complete.xp, 600);
  assert.equal(
    complete.missions.every((mission) => mission.complete),
    true,
  );
});

test("mastery uses recent accuracy so learners can recover", () => {
  const id = exercises[0].command.id;
  assert.equal(mastery(undefined), "starting");
  assert.equal(mastery(row(id, 3, 10)), "starting");
  assert.equal(mastery({ ...row(id, 3, 5), recentCorrect: 3 }), "building");
  assert.equal(
    mastery({ ...row(id, 15, 40), recentAttempts: 20, recentCorrect: 14 }),
    "confident",
  );
  assert.equal(
    mastery({ ...row(id, 15, 40), recentAttempts: 20, recentCorrect: 5 }),
    "starting",
  );
});
