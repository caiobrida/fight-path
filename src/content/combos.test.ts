import assert from "node:assert/strict";
import test from "node:test";
import { baseLessons } from "./learning";
import {
  facingNotation,
  filterCombos,
  publishedCombos,
  verifiedCombos,
  publishableCombos,
  categoryNames,
  mirrorComboNotation,
  localizedNotation,
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

test("independent gameplay verification still requires complete demonstrations", () => {
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
  assert.ok(verifiedCombos(publishedCombos).length === 0);
});

test("approved community references publish without claiming game verification", () => {
  assert.equal(publishedCombos.length, 124);
  for (const recipe of publishedCombos) {
    assert.equal(recipe.evidence.kind, "community-source");
    assert.equal(recipe.lesson.patch?.review, "sourced");
    assert.equal(recipe.evidence.build, "");
    assert.equal(recipe.evidence.rightClip, "");
    assert.ok(recipe.notation);
    assert.ok(recipe.evidence.sourceRows?.length);
  }
  const source = publishedCombos[0];
  assert.equal(
    publishableCombos([
      { ...source, lesson: { ...source.lesson, status: "draft" } },
    ]).length,
    0,
  );
  assert.equal(
    publishableCombos([
      {
        ...source,
        evidence: { ...source.evidence, sourceUrl: "https://example.com/" },
      },
    ]).length,
    0,
  );
});

test("source cost conflicts are unknown rather than meterless and alternatives remain explicit", () => {
  const conflict = publishedCombos.find((recipe) => recipe.drive === null);
  assert.ok(conflict);
  assert.ok(
    !filterCombos(publishedCombos, { resource: "meterless" }).includes(
      conflict,
    ),
  );
  assert.ok(
    filterCombos(publishedCombos, { resource: "unknown" }).includes(conflict),
  );
  assert.ok(
    publishedCombos.some(
      (recipe) =>
        Array.isArray(recipe.super) && recipe.super.join("/") === "1/2/3",
    ),
  );
  assert.ok(publishedCombos.some((recipe) => recipe.drive === 7));
  assert.ok(publishedCombos.some((recipe) => recipe.template));
});

test("the library covers all requested categories and composes category filters", () => {
  for (const category of Object.keys(categoryNames.en)) {
    const results = filterCombos(publishedCombos, { category });
    assert.ok(results.length > 0, category);
    assert.ok(
      results.every((recipe) =>
        recipe.categories?.includes(category as keyof typeof categoryNames.en),
      ),
    );
  }
  const results = filterCombos(publishedCombos, {
    category: "normal-meterless",
    difficulty: "easy",
    position: "anywhere",
    resource: "meterless",
    kind: "route",
  });
  assert.ok(results.length > 0);
  assert.ok(
    results.every(
      (recipe) => recipe.drive === 0 && recipe.super === 0 && !recipe.template,
    ),
  );
  assert.equal(
    filterCombos(publishedCombos, { search: "nonexistent-input" }).length,
    0,
  );
});

test("whole notation mirrors motion tokens while preserving repetition counts and qualifiers", () => {
  assert.equal(
    mirrorComboNotation("PC 5HP > 236LK ~ 6LK, {623HP}x3", "left"),
    "PC 5HP > 214LK ~ 4LK, {421HP}x3",
  );
  assert.equal(
    localizedNotation("Any Cancellable Normal > 236KK (hit / block)", "pt-BR"),
    "Qualquer normal cancelável > 236KK (acerto / defesa)",
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
