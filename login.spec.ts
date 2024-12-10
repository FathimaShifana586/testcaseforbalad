import { test, expect } from '@playwright/test';
 
test.describe('Functionalities Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.gto-portal.com/geoportalv2/', {timeout:60000});
    // login if necessary
    await page.waitForSelector('input[name="userName"]', {timeout:30000});
    await page.fill('input[name="userName"]', 'JHD-fathima');
    await page.fill('input[name="password"]', '1234')
    await page.click('button[type="submit"]');

 
});
 
  test.skip('Zoom In Functionality', async ({ page }) => {
   
    await page.click("//button[@id='0_zoomIn']");
    const zoomLevelText = await page.locator('.zoom-level-selector').innerText();
    const zoomLevel = Number(zoomLevelText);
    expect(zoomLevel).toBeGreaterThan(1);
  });
 
  test.skip('General Search Functionality', async ({ page }) => {
   
    const searchInput = page.locator('input[placeholder="Search here..."]');
    const searchQuery = 'alula';
 
    await searchInput.fill(searchQuery);
    await searchInput.press('Enter');
 
   
    const searchResults = page.locator('.search-results');
    await expect(searchResults).toBeVisible();
    await expect(searchResults).toContainText(searchQuery);
  });
});
