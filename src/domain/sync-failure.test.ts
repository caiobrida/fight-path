import assert from "node:assert/strict";
import test from "node:test";
import { syncFailure } from "./sync-failure";

test("session expiry and rejected data have actionable categories", () => {
  assert.equal(
    syncFailure(new Response(null, { status: 401 })).problem,
    "authentication",
  );
  assert.equal(
    syncFailure(new Response(null, { status: 422 })).problem,
    "rejected",
  );
  assert.equal(
    syncFailure(new Response(null, { status: 503 })).problem,
    "pending",
  );
});

test("rate limiting honors retry-after and defaults to a bounded cooldown", () => {
  assert.equal(
    syncFailure(
      new Response(null, { status: 429, headers: { "Retry-After": "120" } }),
      100,
    ).retryAt,
    120100,
  );
  assert.equal(
    syncFailure(new Response(null, { status: 429 }), 100).retryAt,
    60100,
  );
});
