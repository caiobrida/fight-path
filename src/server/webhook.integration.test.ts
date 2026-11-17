import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createHmac, randomBytes, randomUUID } from "node:crypto";
import { POST } from "@/app/api/webhooks/clerk/route";
import { database } from "./db";
import { readLearning, saveLearning, deleteUserProgress } from "./learning";

const signingKey = randomBytes(32);
process.env.CLERK_WEBHOOK_SIGNING_SECRET = `whsec_${signingKey.toString("base64")}`;
after(async () => {
  if (process.env.DATABASE_URL) await database().end();
});

function request(userId: string, age = 0, tamper = false) {
  const id = `msg_${randomUUID()}`;
  const timestamp = String(Math.floor(Date.now() / 1000) - age);
  const body = JSON.stringify({ type: "user.deleted", data: { id: userId } });
  const signature = createHmac("sha256", signingKey)
    .update(`${id}.${timestamp}.${body}`)
    .digest("base64");
  return new Request("http://localhost/api/webhooks/clerk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "svix-id": id,
      "svix-timestamp": timestamp,
      "svix-signature": `v1,${tamper ? "invalid" : signature}`,
    },
    body,
  });
}

test("Clerk webhook rejects invalid signatures and expired deliveries", async () => {
  assert.equal((await POST(request("fixture", 0, true))).status, 400);
  assert.equal((await POST(request("fixture", 600))).status, 400);
});

test("webhook size is bounded even without a content-length header", async () => {
  const oversized = new Request("http://localhost/api/webhooks/clerk", {
    method: "POST",
    body: "x".repeat(65537),
  });
  assert.equal((await POST(oversized)).status, 413);
});

test(
  "signed deletion removes only the event account and safely handles retries",
  { skip: !process.env.DATABASE_URL },
  async () => {
    const first = `fixture_${randomUUID()}`;
    const second = `fixture_${randomUUID()}`;
    try {
      for (const user of [first, second])
        await saveLearning(user, {
          lessonId: "read-an-input",
          revision: 1,
          kind: "read",
        });
      const event = request(first);
      assert.equal((await POST(event.clone())).status, 200);
      assert.equal((await POST(event.clone())).status, 200);
      assert.equal((await readLearning(first)).length, 0);
      assert.equal((await readLearning(second)).length, 1);
    } finally {
      await deleteUserProgress(first);
      await deleteUserProgress(second);
    }
  },
);
