import { defineConfig } from "@playwright/test";

const site = process.env.FIGHTPATH_SITE_TESTS === "1";
const auth = process.env.FIGHTPATH_AUTH_TESTS === "1";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "components",
      testMatch: ["components.spec.ts", "game-media.spec.ts"],
      use: { baseURL: "http://127.0.0.1:3204" },
    },
    ...(site
      ? [
          {
            name: "site",
            testMatch: "site.spec.ts",
            use: { baseURL: "http://localhost:3205" },
          },
        ]
      : []),
    ...(auth
      ? [
          {
            name: "auth",
            testMatch: "auth.spec.ts",
            use: {
              baseURL: "http://localhost:3205",
              trace: "off" as const,
              screenshot: "off" as const,
              video: "off" as const,
            },
          },
        ]
      : []),
  ],
  webServer: [
    {
      command: "npx vite --config tests/browser/vite.config.mts",
      url: "http://127.0.0.1:3204",
      reuseExistingServer: false,
    },
    ...(site
      ? [
          {
            command: "npx next start --hostname localhost --port 3205",
            url: "http://localhost:3205/en",
            reuseExistingServer: false,
            timeout: 60000,
          },
        ]
      : []),
  ],
});
