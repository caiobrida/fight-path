import assert from "node:assert/strict";
import test from "node:test";
import { OperationQueue } from "./operation-queue";

test("deletion waits until an in-flight save settles", async () => {
  const queue = new OperationQueue();
  const events: string[] = [];
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const save = queue.run(async () => {
    events.push("save-start");
    await gate;
    events.push("save-end");
  });
  const deletion = queue.run(async () => {
    events.push("delete");
  });
  await Promise.resolve();
  assert.deepEqual(events, ["save-start"]);
  release();
  await Promise.all([save, deletion]);
  assert.deepEqual(events, ["save-start", "save-end", "delete"]);
});

test("failed requests cannot poison subsequent operations", async () => {
  const queue = new OperationQueue();
  await assert.rejects(
    queue.run(async () => {
      throw new Error("offline");
    }),
  );
  assert.equal(await queue.run(async () => 42), 42);
});
