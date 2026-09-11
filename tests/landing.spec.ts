import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function imagesReady(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Showcase artwork below the fold loads lazily; opt it in before waiting.
    await Promise.all(Array.from(document.images, async (image) => {
      image.loading = "eager";
      if (!image.complete) {
        await new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }
      await image.decode();
    }));
  });
}

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
}

async function expectAccessible(page: Page) {
  // Measure final rendered colors after the dialog entrance animation. Looping
  // animations never finish, and streamed-away placeholders cancel theirs.
  await page.evaluate(() => Promise.all(document.getAnimations()
    .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
    .map((animation) => animation.finished.catch(() => undefined))));
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

test("the showcase grid, CTA band, and footer complete the page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");

  const grid = page.getByRole("list", { name: "Pokémon in the Pokédex" });
  const cards = grid.getByRole("listitem");
  // The loading placeholder gives way to the resolved dataset.
  await expect(page.getByText("Loading Pokémon…")).toHaveCount(0);
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThanOrEqual(8);
  await imagesReady(page);

  // Every card carries a name, artwork, an identifier, and at least one type badge.
  for (const card of await cards.all()) {
    await expect(card.getByRole("heading", { level: 3 })).toHaveText(/\S+/);
    await expect(card.locator("img")).toHaveAttribute("alt", /\S+/);
    await expect(card.getByText(/^#\d{3}$/)).toBeVisible();
    expect(await card.locator("[data-slot=badge]").count()).toBeGreaterThan(0);
    const box = (await card.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  }

  // Sections appear below the hero in order, and the footer renders at every width.
  const top = async (locator: ReturnType<Page["locator"]>) => (await locator.boundingBox())!.y;
  const order = [
    await top(page.locator("h1")),
    await top(page.getByRole("heading", { name: /a whole story/ })),
    await top(page.getByRole("heading", { name: /Your partner is out there/ })),
    await top(page.getByRole("contentinfo")),
  ];
  expect(order).toEqual([...order].sort((a, b) => a - b));
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "PokéPal home" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Meet the starters" })).toBeVisible();

  await noOverflow(page);
  await expectAccessible(page);
  expect(errors).toEqual([]);
});

test("cards open a detail dialog and hand focus back", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("button", { name: /^Gengar, number 094/ });
  await card.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName(/Gengar/);
  await expect(dialog.getByText("The Shadow Pokémon")).toBeVisible();
  await expect(dialog.getByText("Cursed Body")).toBeVisible();
  await expect(dialog.getByRole("img", { name: /Gengar/ })).toBeVisible();

  // Focus stays inside the open dialog.
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBeTruthy();
  }
  await noOverflow(page);
  await expectAccessible(page);

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
  // The ring is painted by the card shell, which is what stays unclipped.
  const shell = page.getByRole("listitem").filter({ has: card }).locator("[data-slot=card]");
  await expect(shell).toHaveCSS("outline-width", "2px");
  await expect(shell).toHaveCSS("outline-style", "solid");
});

test("type badges follow the shared palette and in-page links reach the sections", async ({ page }) => {
  await page.goto("/");
  const electricBadge = page.getByRole("list", { name: "Pokémon in the Pokédex" }).getByText("electric", { exact: true }).first();
  await expect(electricBadge).toHaveCSS("background-color", "rgb(248, 208, 48)");
  await page.evaluate(() => document.documentElement.style.setProperty("--type-electric", "rgb(10, 90, 140)"));
  await expect(electricBadge).toHaveCSS("background-color", "rgb(10, 90, 140)");
  await page.evaluate(() => document.documentElement.style.removeProperty("--type-electric"));

  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.getByRole("link", { name: "Meet the Pokémon below" }).click();
  expect(page.url()).toContain("#showcase");
  await expect(page.locator("#showcase")).toBeInViewport({ ratio: 0.1 });
  await expect.poll(async () => (await page.locator("#showcase").boundingBox())!.y).toBeLessThan(120);

  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Get started" }).click();
  expect(page.url()).toContain("#start");
  await expect(page.locator("#start")).toBeInViewport({ ratio: 0.5 });
  await expect(page.getByRole("button", { name: "Meet the starters" })).toBeVisible();
});
