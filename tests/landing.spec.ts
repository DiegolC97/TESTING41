import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function imagesReady(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });
}

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
}

async function expectAccessible(page: Page) {
  // Measure final rendered colors after the dialog entrance animation.
  await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished)));
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map(({ id, nodes }) => ({
    id,
    nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
  }))).toEqual([]);
}

test("landing metadata, assets, layout, and accessibility", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await imagesReady(page);

  await expect(page).toHaveTitle("PokéPal — Small beginnings. Big adventures.");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Meet your first Pokémon/);
  const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
  expect(favicon).toContain("icon.svg");
  const iconResponse = await page.request.get(favicon!);
  expect(iconResponse.ok()).toBeTruthy();
  expect(iconResponse.headers()["content-type"]).toContain("image/svg+xml");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Big adventures.");
  await noOverflow(page);

  for (const image of await page.locator("main img").all()) {
    await expect(image).toHaveAttribute("alt", /\S+/);
    expect(Number(await image.getAttribute("width"))).toBeGreaterThan(0);
    expect(Number(await image.getAttribute("height"))).toBeGreaterThan(0);
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  for (const name of ["Find your partner", "Explore the types"]) {
    const button = page.getByRole("button", { name, exact: true });
    const box = (await button.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  }
  await expectAccessible(page);
  await page.screenshot({ path: test.info().outputPath("landing.png"), fullPage: true, animations: "disabled" });
  expect(errors).toEqual([]);
});

test("CTAs open usable dialogs and restore keyboard focus", async ({ page }) => {
  await page.goto("/");
  const primary = page.getByRole("button", { name: "Find your partner", exact: true });
  await primary.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Meet your first partner.");
  await dialog.getByRole("button", { name: "Charmander" }).click();
  await expect(dialog.getByRole("heading", { name: "Charmander", exact: true })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Charmander" })).toHaveAttribute("aria-pressed", "true");
  await dialog.getByRole("button", { name: "Squirtle" }).click();
  await expect(dialog.getByRole("heading", { name: "Squirtle", exact: true })).toBeVisible();
  await noOverflow(page);
  await expectAccessible(page);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(primary).toBeFocused();

  const secondary = page.getByRole("button", { name: "Explore the types", exact: true });
  await secondary.focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toHaveAccessibleName("Find your kind of extraordinary.");
  await expect(dialog.getByRole("listitem")).toHaveCount(18);
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBeTruthy();
  }
  await expectAccessible(page);
  await noOverflow(page);
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(secondary).toBeFocused();
});

test("images reserve space and theme tokens control the hero", async ({ page }) => {
  let releaseImages!: () => void;
  const imageGate = new Promise<void>((resolve) => { releaseImages = resolve; });
  await page.route("**/_next/image?**", async (route) => {
    await imageGate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const heroImage = page.getByRole("img", { name: /Pikachu smiling/ });
  const beforeImage = await heroImage.boundingBox();
  const beforeHeading = await page.locator("h1").boundingBox();
  releaseImages();
  await imagesReady(page);
  expect(await heroImage.boundingBox()).toEqual(beforeImage);
  expect(await page.locator("h1").boundingBox()).toEqual(beforeHeading);

  const headingAccent = page.locator("h1 span");
  await page.evaluate(() => document.documentElement.style.setProperty("--primary", "rgb(12, 80, 120)"));
  await expect(headingAccent).toHaveCSS("color", "rgb(12, 80, 120)");
  await page.evaluate(() => document.documentElement.style.removeProperty("--primary"));
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await noOverflow(page);
  await expectAccessible(page);
});
