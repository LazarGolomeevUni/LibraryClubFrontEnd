import { test, expect } from "@playwright/test";

test("User Logs in and sees Posts on Homepage", async ({ page }) => {
  await page.goto(
    "http://tlcstaging.s3-website.eu-north-1.amazonaws.com"
  );
  await page.waitForSelector(".navbar", { state: "visible" });
  await page.click("text=Login");
  await page.waitForSelector(".login-form", { state: "visible" });
  await page.fill("#login-email", "Maya");
  await page.fill("#login-password", "great");
  await page.click("text=Log In");
  await page.waitForSelector(".post-contaier", { state: "visible" });
  const firstPostContainer = await page.locator(".post-contaier").first();
  await expect(firstPostContainer).toBeVisible();
});
