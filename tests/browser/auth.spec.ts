import { test, expect } from "@playwright/test";
import { createClerkClient } from "@clerk/backend";
import {
  clerk,
  clerkSetup,
  setupClerkTestingToken,
} from "@clerk/testing/playwright";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { database } from "../../src/server/db";
import { deleteUserProgress } from "../../src/server/learning";
import { keyboardMotion, startPractice } from "./fixtures";

test("disposable Clerk accounts keep lesson and input progress private across switching export and deletion", async ({
  page,
}) => {
  test.setTimeout(120000);
  const url = new URL(process.env.DATABASE_URL ?? "");
  if (!["localhost", "127.0.0.1"].includes(url.hostname))
    throw new Error(
      "Authenticated regressions require the disposable local database",
    );
  const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const readInstance = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await client.instance.get();
      } catch (error) {
        if (attempt === 2) throw error;
        await delay(500);
      }
    }
    throw new Error("Clerk instance unavailable");
  };
  const instance = await readInstance();
  expect(instance.id).toBe("ins_3MEZV6ajaCTDDmbGUxEVoFC7diH");
  expect(instance.environmentType).toBe("development");
  const users: { id: string; email: string }[] = [];
  try {
    await clerkSetup();
    await setupClerkTestingToken({ page });
    for (let i = 0; i < 2; i++) {
      const email = `fightpath-e2e-${randomUUID()}+clerk_test@example.com`;
      const user = await client.users.createUser({
        emailAddress: [email],
        skipPasswordRequirement: true,
        firstName: "Regression",
        lastName: "Fixture",
      });
      users.push({ id: user.id, email });
    }
    await page.goto("/en");
    await clerk.signIn({ page, emailAddress: users[0].email }).catch(() => {
      throw new Error("Disposable Clerk sign-in failed");
    });
    await page.goto("/en/setup");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Set up controls",
    );
    await page.goto("/en/learn/read-an-input");
    await page
      .getByRole("button", { name: "Mark as read", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Reading recorded", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("radio", {
        name: "Left and right directions are mirrored",
        exact: true,
      })
      .check();
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(
      page.getByText("Correct check recorded.", { exact: true }),
    ).toBeVisible();
    await page.goto("/en/practice");
    await startPractice(page);
    await keyboardMotion(page);
    await expect(page.locator(".practice__stats > div").first()).toHaveText(
      "Attempts1",
    );
    await expect(
      page.getByText("Progress saved", { exact: true }),
    ).toBeVisible();
    const firstExport = await (
      await page.request.get("/api/progress/export")
    ).json();
    expect(firstExport.attempts).toHaveLength(1);
    expect(firstExport.learningActivities).toHaveLength(2);
    let releaseResponse: (() => void) | undefined;
    let acknowledged = false;
    const responseGate = new Promise<void>((resolve) => {
      releaseResponse = resolve;
    });
    await page.route("**/api/progress", async (route) => {
      if (route.request().method() !== "POST") return route.continue();
      const response = await route.fetch();
      expect(response.status()).toBe(200);
      acknowledged = true;
      await responseGate;
      await route.fulfill({ response }).catch(() => {});
    });
    await keyboardMotion(page);
    await expect.poll(() => acknowledged).toBe(true);
    await clerk.signOut({ page });
    expect((await page.request.get("/api/learning")).status()).toBe(401);
    await page.goto("/pt-BR");
    await clerk.signIn({ page, emailAddress: users[1].email }).catch(() => {
      throw new Error("Disposable Clerk sign-in failed");
    });
    releaseResponse?.();
    await page.unroute("**/api/progress");
    const secondExport = await (
      await page.request.get("/api/progress/export")
    ).json();
    expect(secondExport.attempts).toHaveLength(0);
    expect(secondExport.learningActivities).toHaveLength(0);
    await page.goto("/pt-BR/learn/read-an-input");
    await page
      .getByRole("button", { name: "Marcar como lida", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Leitura registrada", exact: true }),
    ).toBeVisible();
    await clerk.signOut({ page });
    await page.goto("/en");
    await clerk.signIn({ page, emailAddress: users[0].email }).catch(() => {
      throw new Error("Disposable Clerk sign-in failed");
    });
    await page.goto("/en/practice");
    await expect(
      page.getByText("Progress saved", { exact: true }),
    ).toBeVisible();
    const retained = await (
      await page.request.get("/api/progress/export")
    ).json();
    expect(retained.attempts).toHaveLength(2);
    expect(retained.learningActivities).toHaveLength(2);
    const deletion = await page.request.delete("/api/progress", {
      headers: { Origin: "http://localhost:3205" },
    });
    expect(deletion.status()).toBe(200);
    const cleared = await (
      await page.request.get("/api/progress/export")
    ).json();
    expect(cleared.attempts).toHaveLength(0);
    expect(cleared.learningActivities).toHaveLength(0);
    const secondRows = await database().query(
      "SELECT 1 FROM learning_activity WHERE user_id = $1",
      [users[1].id],
    );
    expect(secondRows.rowCount).toBe(1);
    await clerk.signOut({ page });
  } finally {
    for (const user of users) {
      await deleteUserProgress(user.id);
      await client.users.deleteUser(user.id);
    }
    await database().end();
  }
});
