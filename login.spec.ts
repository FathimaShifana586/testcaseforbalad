import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.only('Login with Valid Credentials', async ({ page }) => {
    //page.on('response',(response)=>
   //console.log('received from: ${response.url()}')
  //})
    // Navigate to login page
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Fill in login credentials
    await page.fill('input[name="userName"]', 'jhd-fathima');
    await page.fill('input[name="password"]', '1234');

    // Click the login button
    await page.click('button[type="submit"]');

    // Assert that the title or a specific element indicates successful login
    await expect(page).toHaveTitle(/JHD | Geoportal/); // Replace with the actual title
  });

  test.only('Login with Invalid Credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Fill in invalid login credentials
    await page.fill('input[name="userName"]', 'invalidUsername');
    await page.fill('input[name="password"]', 'invalidpassword');

    // Click the login button
    await page.click('button:has-text("Login")');

    // Assert that the error message is visible
    const errorMessage = page.locator('text="Username or Password is wrong."'); // Update with correct selector
    await expect(errorMessage).toBeVisible({ timeout: 15000 });

    // Log the page content and take a screenshot for debugging
    console.log(await page.content());
    await page.screenshot({ path: 'login-error.png' });
  });
});
