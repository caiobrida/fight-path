import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { defaultMapping } from "../../src/domain/mapping";
import {
  activateGamepads,
  installGamepads,
  keyboardMotion,
  mockProgress,
  padSample,
  startPractice,
} from "./fixtures";

for (const locale of ["en", "pt-BR"]) {
  for (const view of ["setup", "practice"]) {
    test(`${view} makes controller selection and live buttons visible in ${locale}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await installGamepads(page, 2);
      await mockProgress(page);
      await page.goto(`/?view=${view}&locale=${locale}`);
      const monitor = page.getByRole("region", {
        name: locale === "en" ? "Controller test" : "Teste do controle",
      });
      await expect(monitor.getByRole("status")).toContainText(
        locale === "en"
          ? "input is using another device"
          : "a entrada está usando outro dispositivo",
      );
      await monitor.getByRole("combobox").selectOption("1");
      await padSample(page, [7], [0, 0], 1);
      await expect(monitor.getByText(/Button7/)).toBeVisible();
      await monitor
        .getByRole("button", {
          name: locale === "en" ? "Use this controller" : "Usar este controle",
        })
        .click();
      await expect(
        page.getByRole("combobox", {
          name: locale === "en" ? /^Device/ : /^Dispositivo/,
        }),
      ).toHaveValue("gamepad");
      await expect(monitor.getByRole("status")).toContainText(
        locale === "en"
          ? "Controller selected for input"
          : "Controle selecionado para entrada",
      );
      await expect(monitor.getByRole("button")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `test-artifacts/${view}-controller-${locale}.png`,
        fullPage: true,
      });
    });
  }
}

test("controller activation after starting practice keeps input capture running", async ({
  page,
}) => {
  await installGamepads(page, 1, false);
  await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page, "gamepad");
  await activateGamepads(page);
  await expect(
    page.getByText("Controller test · Connected", { exact: true }),
  ).toBeVisible();
  await padSample(page, [13]);
  await padSample(page, [13, 15]);
  await padSample(page, [15]);
  await padSample(page, [15, 0]);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeVisible();
});

test("controller activation preserves a pending calibration", async ({
  page,
}) => {
  await installGamepads(page, 1, false);
  await page.goto("/?view=setup");
  await page.getByRole("combobox", { name: /^Device/ }).selectOption("gamepad");
  await page.getByRole("button", { name: /^LP / }).click();
  await activateGamepads(page);
  await expect(
    page.getByText("Controller test · Connected", { exact: true }),
  ).toBeVisible();
  await padSample(page, [7]);
  await expect(page.getByRole("button", { name: /^LP / })).toContainText(
    "Button7",
  );
  await expect(page.locator(".setup__test")).toContainText("LP");
});

test("first activation loads the saved profile without scoring a held button", async ({
  page,
}) => {
  await installGamepads(page, 1, false);
  await page.addInitScript(
    (mapping) => {
      localStorage.setItem(
        `fightpath-mapping-v2-gamepad-${encodeURIComponent("Fixture controller 1:standard")}`,
        JSON.stringify(mapping),
      );
    },
    { ...defaultMapping("gamepad"), LP: "Button7" },
  );
  const progress = await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page, "gamepad");
  await padSample(page, [7]);
  await activateGamepads(page);
  await expect(
    page.getByText("Controller test · Connected", { exact: true }),
  ).toBeVisible();
  expect(progress.count()).toBe(0);
  await padSample(page, []);
  await padSample(page, [13]);
  await padSample(page, [13, 15]);
  await padSample(page, [15]);
  await padSample(page, [15, 7]);
  await expect.poll(() => progress.count()).toBe(1);
  await expect(page.locator(".practice__feedback")).toContainText(
    "Correct sequence",
  );
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await padSample(page, [7]);
  expect(progress.count()).toBe(1);
  await padSample(page, []);
  await padSample(page, [7]);
  await expect.poll(() => progress.count()).toBe(2);
});

test("configure a controller axis, save it and use the same profile in practice", async ({
  page,
}) => {
  await installGamepads(page, 2);
  await mockProgress(page);
  await page.goto("/?view=setup");
  await page.getByText("Controller test", { exact: false }).first().click();
  await page.getByLabel("Active controller").selectOption("1");
  await page.getByRole("button", { name: "Use this controller" }).click();
  await expect(page.getByRole("combobox", { name: /^Device/ })).toHaveValue(
    "gamepad",
  );
  await page.getByRole("button", { name: /^LP / }).click();
  await padSample(page, [7], [0, 0], 1);
  await expect(page.getByRole("button", { name: /^LP / })).toContainText(
    "Button7",
  );
  await padSample(page, [], [0, 0], 1);
  await page.getByRole("button", { name: /^Down / }).click();
  await padSample(page, [], [0, 0, 0, 0, 0, 0, 1], 1);
  await expect(page.getByRole("button", { name: /^Down / })).toContainText(
    "Axis6+",
  );
  await padSample(page, [], [0, 0, 0, 0, 0, 0, 0], 1);
  await page.getByRole("button", { name: "Save layout", exact: true }).click();
  await page
    .getByRole("link", { name: "Practice fixture", exact: true })
    .click();
  await startPractice(page, "gamepad");
  await padSample(page, [], [0, 0, 0, 0, 0, 0, 1], 1);
  await padSample(page, [15], [0, 0, 0, 0, 0, 0, 1], 1);
  await padSample(page, [15], [0, 0, 0, 0, 0, 0, 0], 1);
  await padSample(page, [15, 7], [0, 0, 0, 0, 0, 0, 0], 1);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
  await expect(page.locator(".practice__feedback")).toContainText(
    "Correct sequence",
  );
});

test("held attack and direction changes produce one attempt, disconnect resets held state", async ({
  page,
}) => {
  await installGamepads(page);
  const progress = await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page, "gamepad");
  await padSample(page, [13]);
  await padSample(page, [13, 15]);
  await padSample(page, [15]);
  await padSample(page, [15, 0]);
  await expect.poll(() => progress.count()).toBe(1);
  await padSample(page, [0]);
  await padSample(page, [13, 0]);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
  await page.evaluate(() => {
    (window as unknown as { pads: null[] }).pads = [null];
  });
  await expect(
    page.getByText("Connect a gamepad and press a button.", { exact: true }),
  ).toBeVisible();
});

test("keyboard practice survives rejected saves and exposes an actionable retry", async ({
  page,
}) => {
  await mockProgress(page, [401]);
  await page.goto("/?view=practice");
  await startPractice(page);
  await keyboardMotion(page);
  await expect(
    page.getByText("Sign in again to sync your pending attempts.", {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Retry sync", exact: true }).click();
  await expect(page.getByText("Progress saved", { exact: true })).toBeVisible();
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
});

test("touch dragging reaches diagonals", async ({ page }) => {
  await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page, "touch");
  await page.locator(".practice__touch").scrollIntoViewIfNeeded();
  const down = await page.locator('[data-control="TouchDown"]').boundingBox();
  const diagonal = await page
    .locator('[data-control="TouchDownRight"]')
    .boundingBox();
  const right = await page.locator('[data-control="TouchRight"]').boundingBox();
  if (!down || !diagonal || !right) throw new Error("Missing touch pad");
  await page.mouse.move(down.x + down.width / 2, down.y + down.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    diagonal.x + diagonal.width / 2,
    diagonal.y + diagonal.height / 2,
  );
  await page.mouse.move(right.x + right.width / 2, right.y + right.height / 2);
  await expect(page.locator(".practice__history")).toContainText("→");
  await page.mouse.up();
});

for (const width of [320, 360, 390, 768, 1280])
  test(`setup and practice fit ${width}px with localized controls`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await mockProgress(page);
    for (const view of ["setup", "practice"]) {
      await page.goto(`/?view=${view}&locale=pt-BR`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (width === 390)
        await page.screenshot({
          path: `test-artifacts/${view}-pt-BR-${width}.png`,
          fullPage: true,
        });
    }
  });

test("practice has no serious or critical automated accessibility violations", async ({
  page,
}) => {
  await mockProgress(page);
  await page.goto("/?view=practice");
  await expect(page.getByText("Progress saved", { exact: true })).toBeVisible();
  const result = await new AxeBuilder({ page }).include("main").analyze();
  expect(
    result.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});

test("optional video makes no YouTube request until explicitly loaded and closes cleanly", async ({
  page,
}) => {
  const remote: string[] = [];
  await page.route(/youtube|googlevideo|ytimg/, (route) => {
    remote.push(route.request().url());
    return route.abort();
  });
  await page.goto("/?view=video");
  await expect(
    page.getByRole("button", { name: "Load YouTube player" }),
  ).toBeVisible();
  expect(remote).toEqual([]);
  await page.getByRole("button", { name: "Load YouTube player" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie.*autoplay=0/,
  );
  await page
    .getByRole("button", { name: "Close video and stop playback" })
    .click();
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("keyboard capture stays active when an unrelated controller connects", async ({
  page,
}) => {
  await installGamepads(page, 0);
  await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page);
  await page.evaluate(() => {
    (window as unknown as { pads: unknown[] }).pads = [
      {
        id: "Late fixture",
        index: 0,
        connected: true,
        mapping: "standard",
        buttons: [],
        axes: [0, 0],
      },
    ];
    window.dispatchEvent(new Event("gamepadconnected"));
  });
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeVisible();
  await keyboardMotion(page);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
});

test("blocked local storage keeps keyboard practice available and shows save failure", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get: () => {
        throw new DOMException("Fixture blocked storage", "SecurityError");
      },
    }),
  );
  await mockProgress(page);
  await page.goto("/?view=setup");
  await page.getByRole("button", { name: "Save layout", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Could not save the layout" }),
  ).toContainText("Could not save the layout");
  await page
    .getByRole("link", { name: "Practice fixture", exact: true })
    .click();
  await startPractice(page);
  await keyboardMotion(page);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts1",
  );
});

test("onboarding dialog closes with Escape and restores keyboard focus", async ({
  page,
}) => {
  await mockProgress(page);
  await page.goto("/?view=practice");
  const trigger = page.getByRole("button", {
    name: "How to practice",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("progress deletion waits for an in-flight save and leaves no restored attempt", async ({
  page,
}) => {
  let writes = 0;
  let deleted = false;
  let releaseSave: (() => void) | undefined;
  const saveGate = new Promise<void>((resolve) => {
    releaseSave = resolve;
  });
  await page.route("**/api/progress", async (route) => {
    const method = route.request().method();
    if (method === "POST") {
      await saveGate;
      writes++;
    }
    if (method === "DELETE") {
      writes = 0;
      deleted = true;
    }
    await route.fulfill({
      json:
        method === "DELETE"
          ? { deleted: true }
          : {
              progress: writes
                ? [
                    {
                      exerciseId: "universal-quarter-circle-forward-punch",
                      attempts: 1,
                      correct: 1,
                      recentAttempts: 1,
                      recentCorrect: 1,
                    },
                  ]
                : [],
            },
    });
  });
  await page.goto("/?view=practice");
  await startPractice(page);
  const requestStarted = page.waitForRequest(
    (request) =>
      request.url().endsWith("/api/progress") && request.method() === "POST",
  );
  await keyboardMotion(page);
  await requestStarted;
  page.once("dialog", (dialog) => dialog.accept());
  await page
    .getByRole("button", { name: "Delete progress", exact: true })
    .click();
  expect(deleted).toBe(false);
  releaseSave?.();
  await expect.poll(() => deleted).toBe(true);
  await expect(page.locator(".practice__stats > div").first()).toHaveText(
    "Attempts0",
  );
  expect(writes).toBe(0);
});

for (const status of [-1, 429, 503])
  test(`temporary save failure ${status} preserves one attempt through retry`, async ({
    page,
  }) => {
    const progress = await mockProgress(page, [status]);
    await page.goto("/?view=practice");
    await startPractice(page);
    await keyboardMotion(page);
    await expect(
      page.getByRole("button", { name: "Retry sync", exact: true }),
    ).toBeVisible();
    if (status === 429) await page.waitForTimeout(1100);
    await page.getByRole("button", { name: "Retry sync", exact: true }).click();
    await expect.poll(() => progress.count()).toBe(1);
    await expect(
      page.getByText("Progress saved", { exact: true }),
    ).toBeVisible();
    await expect(page.locator(".practice__stats > div").first()).toHaveText(
      "Attempts1",
    );
  });

test("a rejected record does not block a later valid attempt", async ({
  page,
}) => {
  const progress = await mockProgress(page, [422]);
  await page.goto("/?view=practice");
  await startPractice(page);
  await keyboardMotion(page);
  await expect(
    page.getByRole("button", {
      name: "Download unsynced attempts",
      exact: true,
    }),
  ).toBeVisible();
  await keyboardMotion(page);
  await expect.poll(() => progress.count()).toBe(1);
  await expect(
    page.getByRole("button", {
      name: "Download unsynced attempts",
      exact: true,
    }),
  ).toBeVisible();
});
