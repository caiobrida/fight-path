import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publishedLessons } from "../../src/content/catalog";

for (const locale of ["en", "pt-BR"]) {
  test(`public pages and lesson links resolve in ${locale}`, async ({
    request,
  }) => {
    const paths = [
      "",
      "/privacy",
      "/learn",
      "/design-system",
      "/ken/combos",
      ...publishedLessons.map((lesson) => `/learn/${lesson.id}`),
    ];
    for (const path of paths) {
      const response = await request.get(`/${locale}${path}`);
      expect(response.status(), `${locale}${path}`).toBe(200);
      const html = await response.text();
      expect(html).not.toContain("PRECIS?O");
      expect(html).not.toContain("Navega??o");
      const links = [...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)]
        .map((match) => match[1].replaceAll("&amp;", "&"))
        .filter(
          (link) => !link.startsWith("/_next/") && !link.startsWith("//"),
        );
      for (const link of new Set(links)) {
        const linked = await request.get(link, { maxRedirects: 0 });
        expect(linked.status(), link).toBeLessThan(400);
      }
    }
    const unpublished = await request.get(`/${locale}/ken/combos/ken-light`);
    expect(unpublished.status()).toBe(404);
  });

  test(`protected pages keep a safe localized destination in ${locale}`, async ({
    request,
  }) => {
    for (const path of ["setup", "practice", "learn/progress"]) {
      const response = await request.get(`/${locale}/${path}`, {
        maxRedirects: 0,
      });
      expect(response.status()).toBe(307);
      const destination = new URL(
        response.headers().location,
        "http://localhost:3205",
      );
      expect(destination.pathname).toBe(`/${locale}/sign-in`);
      expect(destination.searchParams.get("returnTo")).toBe(
        `/${locale}/${path}`,
      );
    }
  });

  for (const width of [320, 360, 390, 768, 1280])
    test(`home and catalog fit ${width}px in ${locale}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["", "/learn", "/ken/combos"]) {
        await page.goto(`/${locale}${path}`);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        if (!path && (width === 390 || width === 1280))
          await page.screenshot({
            path: `test-artifacts/home-${locale}-${width}.png`,
            fullPage: true,
          });
      }
    });
}

test("public endpoints deny private data and unlocalized auth aliases resolve", async ({
  request,
}) => {
  for (const path of [
    "/api/progress",
    "/api/progress/export",
    "/api/learning",
    "/api/cron/retention",
  ])
    expect((await request.get(path)).status()).toBe(401);
  const response = await request.get("/sign-in", {
    headers: { "Accept-Language": "pt-BR" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(307);
  expect(
    new URL(response.headers().location, "http://localhost:3205").pathname,
  ).toBe("/pt-BR/sign-in");
});

test("home and reader pass serious automated accessibility checks", async ({
  page,
}) => {
  for (const path of ["/pt-BR", "/pt-BR/learn/read-an-input"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).include("main").analyze();
    expect(
      result.violations.filter(
        (item) => item.impact === "critical" || item.impact === "serious",
      ),
    ).toEqual([]);
  }
});
