import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publishedCombos } from "../../src/content/combos";
import { supercomboKenUrl } from "../../src/content/ken-combos";

const first = publishedCombos[0];

for (const locale of ["en", "pt-BR"]) {
  const pt = locale === "pt-BR";
  test(`combo categories, pagination and combined filters work in ${locale}`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/ken/combos`);
    await expect(page.locator(".fp-combo-hero")).toContainText("124");
    await expect(page.locator(".fp-combo-card")).toHaveCount(24);
    await expect(page.locator(".fp-combo-hero a")).toHaveAttribute(
      "href",
      supercomboKenUrl,
    );
    await page.getByRole("link", { name: pt ? "Próxima" : "Next" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.locator(".fp-combo-card").first()).not.toHaveAttribute(
      "data-combo-id",
      first.lesson.id,
    );
    await page
      .getByRole("link", {
        name: /^(Acerto normal · sem gasto|Normal hit · meterless)/,
      })
      .click();
    await page
      .getByRole("combobox", {
        name: pt ? "Dificuldade" : "Difficulty",
        exact: true,
      })
      .selectOption("easy");
    await page
      .getByRole("combobox", { name: pt ? "Posição" : "Position", exact: true })
      .selectOption("anywhere");
    await page
      .getByRole("combobox", {
        name: pt ? "Recursos" : "Resources",
        exact: true,
      })
      .selectOption("meterless");
    await page
      .getByRole("combobox", {
        name: pt ? "Tipo de entrada" : "Entry type",
        exact: true,
      })
      .selectOption("route");
    await page
      .getByRole("button", { name: pt ? "Filtrar" : "Filter", exact: true })
      .click();
    await expect(page).toHaveURL(/category=normal-meterless/);
    await expect(page.locator(".fp-combo-card").first()).toBeVisible();
    for (const meter of await page.locator(".fp-combo-card .fp-meter").all())
      await expect(meter.locator("strong")).toHaveText("0");
    await page
      .getByLabel(pt ? "Buscar por input ou início" : "Search input or starter")
      .fill("not-a-real-combo");
    await page
      .getByRole("button", { name: pt ? "Filtrar" : "Filter", exact: true })
      .click();
    await expect(page.locator(".fp-combo-card")).toHaveCount(0);
    await expect(
      page.getByText(
        pt ? "Nenhum combo com esses filtros" : "No combos match these filters",
      ),
    ).toBeVisible();
  });

  test(`source detail keeps notation, source and facing usable in ${locale}`, async ({
    page,
    request,
  }) => {
    await page.goto(`/${locale}/ken/combos/${first.lesson.id}`);
    const sequence = page.locator(".fp-combo-notation");
    await expect(sequence).toHaveAttribute("aria-label", first.notation!);
    await page
      .getByRole("combobox", { name: pt ? "Lado" : "Facing", exact: true })
      .selectOption("left");
    await expect(sequence).toHaveAttribute("aria-label", /421HP/);
    await expect(sequence).not.toHaveAttribute("aria-label", /623HP/);
    await expect(page.locator(".fp-sources a")).toHaveAttribute(
      "href",
      `${supercomboKenUrl}#Starter_Combos`,
    );
    await expect(
      page.getByText(
        pt
          ? "Demonstração oficial do golpe isolado, não do combo completo."
          : "Official demonstration of an isolated move, not the complete combo.",
      ),
    ).toBeVisible();
    await expect(page.locator("video")).toHaveCount(0);
    const alias = await request.get(`/${locale}/learn/${first.lesson.id}`, {
      maxRedirects: 0,
    });
    expect(alias.status()).toBe(307);
    expect(alias.headers().location).toBe(
      `/${locale}/ken/combos/${first.lesson.id}`,
    );
  });

  test(`combo library and long routes fit phone and desktop in ${locale}`, async ({
    page,
  }) => {
    const long = [...publishedCombos].sort(
      (a, b) => (b.notation?.length ?? 0) - (a.notation?.length ?? 0),
    )[0];
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["", `/${long.lesson.id}`]) {
        await page.goto(`/${locale}/ken/combos${path}`);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        if (width === 390 || width === 1280)
          await page.screenshot({
            path: `test-artifacts/combos-${path ? "detail" : "library"}-${locale}-${width}.png`,
            fullPage: true,
          });
      }
    }
  });
}

test("variable expenditure, unknown costs and incomplete templates remain explicit", async ({
  page,
}) => {
  const variable = publishedCombos.find((recipe) =>
    Array.isArray(recipe.super),
  )!;
  await page.goto(`/en/ken/combos/${variable.lesson.id}`);
  await expect(page.locator(".fp-meter--super strong")).toHaveText("1 / 2 / 3");
  await expect(
    page.locator('.fp-meter--super [data-fill="variant"]'),
  ).toHaveCount(2);
  const unknown = publishedCombos.find((recipe) => recipe.drive === null)!;
  await page.goto(`/en/ken/combos/${unknown.lesson.id}`);
  await expect(
    page.getByRole("img", {
      name: "Drive: source value missing or conflicting",
    }),
  ).toBeVisible();
  await expect(
    page.locator('.fp-meter--drive [data-fill="unknown"]'),
  ).toHaveCount(6);
  const template = publishedCombos.find((recipe) => recipe.template)!;
  await page.goto(`/en/ken/combos/${template.lesson.id}`);
  await expect(
    page.getByText("This entry is a segment or template", { exact: false }),
  ).toBeVisible();
  const caveat = publishedCombos.find((recipe) => recipe.sourceCaveat)!;
  await page.goto(`/en/ken/combos/${caveat.lesson.id}`);
  await expect(
    page.getByText("The source flags caveats or incomplete data", {
      exact: false,
    }),
  ).toBeVisible();
});

test("invalid combo filters and missing routes fail gracefully", async ({
  request,
}) => {
  for (const query of [
    "category=toString",
    "category=__proto__",
    "resource=bogus",
    "kind=bogus",
    "page=-20",
    "page=999999",
  ])
    expect((await request.get(`/en/ken/combos?${query}`)).status(), query).toBe(
      200,
    );
  expect((await request.get("/en/ken/combos/missing-route")).status()).toBe(
    404,
  );
});

test("combo library and detail have no serious automated accessibility violations", async ({
  page,
}) => {
  for (const locale of ["en", "pt-BR"])
    for (const path of ["", `/${first.lesson.id}`]) {
      await page.goto(`/${locale}/ken/combos${path}`);
      const result = await new AxeBuilder({ page }).include("main").analyze();
      expect(
        result.violations.filter(
          (item) => item.impact === "serious" || item.impact === "critical",
        ),
      ).toEqual([]);
    }
});
