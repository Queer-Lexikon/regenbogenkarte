import { test, expect } from "@playwright/test";

test.describe("exit button", () => {
	test.beforeEach(async ({ page, baseURL }) => {
		test.fail(baseURL === undefined, "baseURL should be set");
		await page.goto(baseURL!);
	});
	test("should open new tab with wikipedia", async ({ page }) => {
		const [wikipedia] = await Promise.all([
			page.waitForEvent("popup"),
			page.locator("text=Notausgang").click(),
		]);
		await expect(wikipedia).toHaveURL("https://de.wikipedia.org/wiki/Wikipedia:Hauptseite");
	});
	test("should navigate to google", async ({ page }) => {
		await Promise.all([page.waitForEvent("popup"), page.locator("text=Notausgang").click()]);
		await expect(page).toHaveURL(/google\.com/);
	});
	test("should open two tabs in total", async ({ page }) => {
		await Promise.all([page.waitForEvent("popup"), page.locator("text=Notausgang").click()]);
		await expect(page.context().pages()).toHaveLength(2);
	});
});
test.describe("hamburger button", () => {
	// Use a Pixel 5 as a reference mobile device.
	test.use({
		viewport: { width: 393, height: 851 },
		deviceScaleFactor: 2,
		hasTouch: true,
	});

	const buttonLocator = ".js-header-button:visible";

	test.beforeEach(async ({ page, baseURL }) => {
		test.fail(baseURL === undefined, "baseURL should be set");
		await page.goto(baseURL!);
	});

	test("should be visible", async ({ page }) => {
		await expect(page.locator(buttonLocator)).toBeVisible();
	});
	test("click reveals and unreveals menu", async ({ page }) => {
		page.locator(buttonLocator).click();
		await expect(page.locator("#mobile-header")).toBeVisible();

		page.locator(buttonLocator).click();
		await expect(page.locator("#mobile-header")).toBeHidden();
	});
	test("info menu button is not affected", async ({ page }) => {
		const headerBtn = page.locator(buttonLocator);
		headerBtn.click();
		await page.locator("#open-menu-btn").tap();
		await expect(page.locator("#menu >> .z-menu")).toBeVisible();
	});
});
