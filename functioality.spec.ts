import { test, expect } from '@playwright/test';

test.describe('Profile Menu, Language Switcher, and General Search Test', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Navigating to login page...');
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login', { timeout: 60000 });

    console.log('Filling login form...');
    await page.waitForSelector('input[name="userName"]');
    await page.fill('input[name="userName"]', 'JHD-fathima');
    await page.fill('input[name="password"]', '1234');
    await page.click('button[type="submit"]');

    console.log('Waiting for page to load...');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('Waiting for profile menu button...');
    await page.waitForSelector('button[ng-click="togglewithactive(\'profilemenu\', \'profilemenu-btn\', \'nav-part2\')"]', { timeout: 120000 });

    // Wait for the search input field to be visible
    console.log('Waiting for search input...');
    await page.waitForSelector('#nav-part3 > input', { timeout: 120000 });
  });

  test('ProfileMenu button is clickable and opens profile menu', async ({ page }) => {
    const profileMenuButton = await page.locator('button[ng-click="togglewithactive(\'profilemenu\', \'profilemenu-btn\', \'nav-part2\')"]');
    await expect(profileMenuButton).toBeVisible();
    await profileMenuButton.click();

    const profileMenu = await page.locator('#profileMenu');
    await expect(profileMenu).toBeVisible();

    const menuItem = await profileMenu.locator('text=Profile');
    await expect(menuItem).toBeVisible();
  });

  test('Language Switcher button should switch the language when clicked', async ({ page }) => {
    const languageButton = await page.locator('#langMenu-btn');
    
    const initialLanguage = await languageButton.locator('.languageEnLabelDiv').textContent();
    
    await languageButton.click();
    
    const updatedLanguage = await languageButton.locator('.languageEnLabelDiv').textContent();
    
    expect(updatedLanguage).not.toBe(initialLanguage);
  });

  test('Language label should be visible with the correct class', async ({ page }) => {
    const languageLabel = await page.locator('.languageLabelDiv');
    await expect(languageLabel).toBeVisible();
  });

  test('Notification button should be clickable and show notification count', async ({ page }) => {
    const notificationButton = await page.locator('#projectNotificationt-btn > mat-icon');
    await expect(notificationButton).toBeVisible();
    await notificationButton.click();

    const badgeContent = await page.locator('#mat-badge-content-0');
    await expect(badgeContent).toBeVisible();
    
    const notificationCount = await badgeContent.textContent();
    expect(notificationCount).toBe('32');
    await page.screenshot({ path: 'notificationCount.png' });
  });

  test('General search should work and show relevant results', async ({ page }) => {
    const searchInput = await page.locator('#nav-part3 > input');
    
    
    const searchText = '10';
    await searchInput.fill(searchText);

    
    await searchInput.press('Enter');

   
    const searchResults = await page.locator('.search-results');
    await expect(searchResults).toBeVisible();

    
    await expect(searchResults).toContainText(searchText);
    await page.screenshot({ path: 'general-search-results.png' });
  });
});



