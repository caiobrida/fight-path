import assert from "node:assert/strict";
import test from "node:test";
import { safeReturnTo, signInPath } from "./auth-return";

test("auth returns accept only published local destinations in the active locale", () => {
  for (const invalid of [
    "https://evil.example/en/setup",
    "//evil.example",
    "/en/practice,https://fight-path.vercel.app/en/privacy",
    ["/en/setup", "/en/privacy"],
    "/en/sign-in",
    "/en/learn/unpublished",
    "/pt-BR/setup",
    "/en/setup?next=evil",
    "/en/%2e%2e/setup",
    "\\evil.example",
  ])
    assert.equal(safeReturnTo(invalid, "en"), "/en/practice");
  assert.equal(safeReturnTo("/en/setup", "en"), "/en/setup");
  assert.equal(
    safeReturnTo("/en/learn/read-an-input", "en"),
    "/en/learn/read-an-input",
  );
  assert.equal(
    signInPath("pt-BR", "/pt-BR/setup"),
    "/pt-BR/sign-in?returnTo=%2Fpt-BR%2Fsetup",
  );
});
