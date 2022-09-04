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
