import { expect, type Page } from "@playwright/test";

type FixtureWindow = Window & {
  pads: (Gamepad | null)[];
  gamepadsVisible: boolean;
};

export async function installGamepads(page: Page, count = 1, visible = true) {
  await page.addInitScript(
    ({ count, visible }) => {
      const target = window as unknown as FixtureWindow;
      target.gamepadsVisible = visible;
      target.pads = Array.from(
        { length: count },
        (_, index) =>
          ({
            id: `Fixture controller ${index + 1}`,
            index,
            connected: true,
            mapping: index ? "" : "standard",
            timestamp: 0,
            buttons: Array.from({ length: 18 }, () => ({
              pressed: false,
              touched: false,
              value: 0,
            })),
            axes: [0, 0, 0, 0, 0, 0, 0],
          }) as unknown as Gamepad,
      );
      Object.defineProperty(navigator, "getGamepads", {
        value: () => (target.gamepadsVisible ? target.pads : []),
      });
    },
    { count, visible },
  );
}

export async function activateGamepads(page: Page) {
  await page.evaluate(() => {
    (window as unknown as FixtureWindow).gamepadsVisible = true;
    window.dispatchEvent(new Event("gamepadconnected"));
  });
}

export async function padSample(
  page: Page,
  buttons: number[],
  axes = [0, 0],
  index = 0,
) {
  await page.evaluate(
    async ({ buttons, axes, index }) => {
      const target = window as unknown as FixtureWindow;
      const pad = target.pads[index];
      if (!pad) throw new Error("Missing fixture controller");
      target.pads[index] = {
        ...pad,
        buttons: pad.buttons.map((_, i) => ({
          pressed: buttons.includes(i),
          touched: buttons.includes(i),
          value: buttons.includes(i) ? 1 : 0,
        })),
        axes,
        timestamp: performance.now(),
      } as Gamepad;
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    },
    { buttons, axes, index },
  );
}

export async function mockProgress(page: Page, failures: number[] = []) {
  let count = 0;
  const ids = new Set<string>();
  const posts: Record<string, unknown>[] = [];
  await page.route("**/api/progress", async (route) => {
    const method = route.request().method();
    if (method === "POST") {
      const status = failures.shift();
      if (status === -1) {
        await route.abort("failed");
        return;
      }
      if (status) {
        await route.fulfill({
          status,
          json: { error: "fixture-failure" },
          headers: { "Retry-After": "1" },
        });
        return;
      }
      const input = route.request().postDataJSON();
      posts.push(input);
      if (!ids.has(input.id)) {
        ids.add(input.id);
        count++;
      }
    }
    if (method === "DELETE") {
      count = 0;
      ids.clear();
    }
    await route.fulfill({
      json:
        method === "DELETE"
          ? { deleted: true }
          : {
              progress: count
                ? [
                    {
                      exerciseId: "universal-quarter-circle-forward-punch",
                      attempts: count,
                      correct: count,
                      recentAttempts: count,
                      recentCorrect: count,
                    },
                  ]
                : [],
            },
    });
  });
  return { posts, count: () => count };
}

export async function startPractice(
  page: Page,
  device: "keyboard" | "gamepad" | "touch" = "keyboard",
) {
  await expect(page.getByText("Progress saved", { exact: true })).toBeVisible();
  await page.getByRole("combobox", { name: /^Device/ }).selectOption(device);
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click();
}

export async function keyboardMotion(page: Page) {
  await page.keyboard.down("ArrowDown");
  await page.keyboard.down("ArrowRight");
  await page.keyboard.up("ArrowDown");
  await page.keyboard.press("j");
  await page.keyboard.up("ArrowRight");
}
