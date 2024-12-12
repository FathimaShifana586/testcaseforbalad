import { test, expect } from "@playwright/test";

test.skip('Login with Valid Credentials', async ({ page }) => {
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    await page.fill('input[name="userName"]', 'jhd-fathima');
    await page.fill('input[name="password"]', '1234');
    await page.click('button[type="submit"]');

    // Wait for navigation after login and assert the title
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await expect(page).toHaveTitle(/JHD | Geoportal/);
});

test.skip('Login with Invalid Credentials', async ({ page }) => {
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    await page.fill('input[name="userName"]', 'invalidUsername');
    await page.fill('input[name="password"]', 'invalidpassword');
    await page.click('button:has-text("Login")');

    // Wait for error message to appear and assert its visibility
    const errorMessage = page.locator('text=Username or Password is wrong.');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });

    // Take a screenshot of the error state
    await page.screenshot({ path: 'login-error.png' });
});


