import { expect, test } from "@playwright/test";
import { keyboardMotion, mockProgress, startPractice } from "./fixtures";

for (const locale of ["en", "pt-BR"]) {
  test(`practice shows success, error, mirrored input and reset in ${locale}`, async ({
    page,
  }) => {
    await mockProgress(page);
    await page.goto(`/?view=practice&locale=${locale}`);
    await expect(
      page.getByText(locale === "en" ? "Progress saved" : "Progresso salvo", {
        exact: true,
      }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: locale === "en" ? "Start practice" : "Iniciar treino",
        exact: true,
      })
      .click();
    const panel = page.locator(".practice__panel");
    const target = panel.locator(".practice__sequence");
    const history = panel.locator(".practice__history");
    await keyboardMotion(page);
    await expect(panel).toHaveAttribute("data-result", "success");
    await expect(panel.locator(".lucide-circle-check")).toBeVisible();
    await expect(target.locator("span").first()).toHaveCSS(
      "background-color",
      "rgb(21, 56, 38)",
    );
    const layout = await page.evaluate(() => ({
      target: document
        .querySelector(".practice__sequence")!
        .getBoundingClientRect().bottom,
      history: document
        .querySelector(".practice__history")!
        .getBoundingClientRect().top,
    }));
    expect(layout.history).toBeGreaterThanOrEqual(layout.target);
    await expect(history).toContainText("LP");
    await panel.screenshot({
      path: `test-artifacts/practice-success-${locale}.png`,
    });
    await page.keyboard.press("u");
    await expect(panel).toHaveAttribute("data-result", "error");
    await expect(panel.locator(".lucide-circle-x")).toBeVisible();
    await expect(target.locator("span").first()).toHaveCSS(
      "background-color",
      "rgb(67, 31, 41)",
    );
    await panel.screenshot({
      path: `test-artifacts/practice-error-${locale}.png`,
    });
    await page
      .getByRole("combobox", {
        name: locale === "en" ? "Facing" : "Lado",
        exact: true,
      })
      .selectOption("left");
    await expect(panel).toHaveAttribute("data-result", "pending");
    await expect(target).toContainText("↙");
    await expect(history.locator("li")).toHaveCount(0);
    await page.keyboard.down("ArrowDown");
    await page.keyboard.down("ArrowLeft");
    await page.keyboard.up("ArrowDown");
    await page.keyboard.press("j");
    await page.keyboard.up("ArrowLeft");
    await expect(panel).toHaveAttribute("data-result", "success");
    await page
      .getByRole("button", {
        name: locale === "en" ? "Clear inputs" : "Limpar inputs",
        exact: true,
      })
      .click();
    await expect(panel).toHaveAttribute("data-result", "pending");
    await expect(panel.locator(".practice__result-icon")).toHaveCount(0);
    await page
      .getByRole("combobox", {
        name: locale === "en" ? "Practice path" : "Trilha de treino",
        exact: true,
      })
      .selectOption("ken");
    await expect(panel.locator("img")).toHaveAttribute(
      "src",
      "/images/sf6/ken-hadoken.webp",
    );
  });
}

test("demonstrations load on demand, play, pause offscreen and reset with the exercise", async ({
  page,
}) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) videoRequests.push(request.url());
  });
  await mockProgress(page);
  await page.goto("/?view=practice");
  const media = page.locator(".fp-game-media");
  await expect(media.locator("img")).toBeVisible();
  expect(videoRequests).toEqual([]);
  await media.getByRole("button", { name: "Watch the move: Hadoken" }).click();
  const video = media.locator("video");
  await expect
    .poll(() =>
      video.evaluate(
        (el: HTMLVideoElement) => !el.paused && el.currentTime > 0,
      ),
    )
    .toBe(true);
  expect(
    await video.evaluate((el: HTMLVideoElement) => el.muted && el.loop),
  ).toBe(true);
  await page.locator(".practice__data").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.paused))
    .toBe(true);
  await page.getByRole("button", { name: /^2\. Quarter circle back/ }).click();
  await expect(media.locator("video")).toHaveCount(0);
  await expect(media.locator("img")).toHaveAttribute(
    "src",
    "/images/sf6/ryu-hashogeki.webp",
  );
});

test("failed demonstrations keep a usable poster and official source", async ({
  page,
}) => {
  await mockProgress(page);
  await page.route("**/*.mp4", (route) => route.abort());
  await page.goto("/?view=practice");
  const media = page.locator(".fp-game-media");
  await media.getByRole("button", { name: "Watch the move: Hadoken" }).click();
  await expect(media.getByRole("status")).toContainText(
    "The clip could not load",
  );
  await expect(media.locator("img")).toBeVisible();
  await expect(media.getByRole("link")).toHaveAttribute(
    "href",
    "https://www.streetfighter.com/6/character/ryu/movelist",
  );
});

test("reduced motion disables interface animations and completion has a check", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mockProgress(page);
  await page.goto("/?view=practice");
  await startPractice(page);
  for (let i = 0; i < 10; i++) await keyboardMotion(page);
  const panel = page.locator(".practice__panel");
  await expect(panel).toHaveAttribute("data-result", "success");
  await expect(
    page.getByRole("button", { name: /^1\. Quarter circle forward/ }),
  ).toContainText("Completed");
  await expect(
    page.locator(".practice__lessons .lucide-circle-check"),
  ).toHaveCount(1);
  expect(
    await panel
      .locator(".practice__result-icon")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await panel
      .locator(".practice__sequence span")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
});
