import assert from "node:assert/strict";
import test from "node:test";
import { baseLessons } from "./learning";
import {
  facingNotation,
  filterCombos,
  publishedCombos,
  verifiedCombos,
  type ComboRecipe,
} from "./combos";

function fixture(): ComboRecipe {
  return {
    lesson: {
      ...baseLessons[0],
      id: "fixture-combo",
      patch: {
        review: "verified",
        basis: "Test fixture only",
        build: "fixture",
      },
    },
    situation: "light",
    difficulty: "easy",
    position: "anywhere",
    drive: 0,
    super: 0,
    steps: [
      { directions: "2", attack: "LP", transition: "start" },
      { directions: "236", attack: "LP", transition: "cancel" },
    ],
    conditions: { en: "Fixture", "pt-BR": "Fixture" },
    fallback: { en: "Fixture", "pt-BR": "Fixture" },
    evidence: {
      build: "fixture",
      reviewed: "2026-11-17",
      rightClip: "/fixture-right.webm",
      leftClip: "/fixture-left.webm",
      captions: { en: "/fixture-en.vtt", "pt-BR": "/fixture-pt.vtt" },
    },
  };
}

test("unverified recipes and incomplete demonstrations cannot become public routes", () => {
  const recipe = fixture();
  assert.equal(verifiedCombos([recipe]).length, 1);
  assert.equal(
    verifiedCombos([
      { ...recipe, lesson: { ...recipe.lesson, status: "draft" } },
    ]).length,
    0,
  );
  assert.equal(
    verifiedCombos([
      { ...recipe, evidence: { ...recipe.evidence, leftClip: "" } },
    ]).length,
    0,
  );
  assert.ok(
    publishedCombos.every(
      (recipe) => recipe.lesson.patch?.review === "verified",
    ),
  );
});

test("combo filters combine situation resources position and difficulty", () => {
  const recipe = fixture();
  assert.equal(
    filterCombos([recipe], {
      situation: "light",
      resource: "meterless",
      difficulty: "easy",
      position: "anywhere",
    }).length,
    1,
  );
  assert.equal(filterCombos([recipe], { situation: "corner" }).length, 0);
  assert.equal(filterCombos([recipe], { resource: "spend" }).length, 0);
});

test("facing mirrors only numpad horizontal directions", () => {
  assert.equal(facingNotation("236", "left"), "214");
  assert.equal(facingNotation("623", "left"), "421");
  assert.equal(facingNotation("123456789", "left"), "321654987");
});
