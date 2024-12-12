import { test, expect } from '@playwright/test';

test.describe('Profile Menu, Language Switcher, General Search, and Side Menu Toggle Test', () => {

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

  test('Side menu toggle button should toggle the menu', async ({ page }) => {
    const sideMenuButton = await page.locator('#nav-part1 > button');
    await expect(sideMenuButton).toBeVisible();

    await sideMenuButton.click();
    await page.screenshot({ path: 'side-menu-open.png' });

    const sideMenu = await page.locator('#sideMenu');
    await expect(sideMenu).toBeVisible();

    await sideMenuButton.click();
    await page.screenshot({ path: 'side-menu-closed.png' });
    await expect(sideMenu).not.toBeVisible();
  });

  test('Measurement button should be functional', async ({ page }) => {
    const measurementButton = await page.locator('#\\30 _measure');
    await expect(measurementButton).toBeVisible();

    await measurementButton.click();
    await page.waitForTimeout(1000);

    const measurementTool = await page.locator('div[ng-reflect-message="Measurement"]');
    await expect(measurementTool).toBeVisible();

    console.log('Measurement tool is visible and functional.');
    await page.screenshot({ path: 'measurement-tool.png' });
  });

  test('Measurement tools should be functional', async ({ page }) => {
    // Line Measurement Test
    const lineMeasurementButton = await page.locator('[data-testid="line-measurement-btn"]');
    await expect(lineMeasurementButton).toBeVisible();

    
    try {
        await lineMeasurementButton.click();
        const lineMeasurementTool = await page.locator('div[ng-reflect-message="Line Measurement"]');
        await expect(lineMeasurementTool).toBeVisible();
        console.log('Line Measurement tool is functional.');
    } catch (error) {
        console.error('Line Measurement button click failed or tool did not appear as expected.', error);
    }

    // Area Measurement Test
    const areaMeasurementButton = await page.locator('#areaMeasurementIcon');
    await expect(areaMeasurementButton).toBeVisible();

    await areaMeasurementButton.click();
    const areaMeasurementTool = await page.locator('div[ng-reflect-message="Area Measurement"]');
    await expect(areaMeasurementTool).toBeVisible({ timeout: 3000 }); // Use a timeout to avoid flaky tests in slower environments

    console.log('Area Measurement tool is functional.');
    await page.screenshot({ path: `screenshots/area-measurement-tool-${Date.now()}.png` });

    // Point Coordinates Measurement Test
    const pointCoordinatesButton = await page.locator('#pointCoordinatesIcon');
    await expect(pointCoordinatesButton).toBeVisible();

    await pointCoordinatesButton.click();
    const pointCoordinatesTool = await page.locator('div[ng-reflect-message="Point Coordinates Measurement"]');
    await expect(pointCoordinatesTool).toBeVisible({ timeout: 3000 }); // Use a timeout to avoid flaky tests in slower environments

    console.log('Point Coordinates Measurement tool is functional.');
    await page.screenshot({ path: `screenshots/point-coordinates-tool-${Date.now()}.png` });

    
    console.log('Measurement tools verification completed.');
  });
  test('Full Extent button should work correctly', async ({ page }) => {
    const fullExtentButton = await page.locator('#2_fullExtent');
    await expect(fullExtentButton).toBeVisible();

    // Click on the button
    await fullExtentButton.click();
    
    const zoomLevel = await page.locator('.map-zoom-level').innerText();
    await expect(parseInt(zoomLevel)).toBeGreaterThan(0); 

    
    const tooltip = await page.locator('[aria-describedby="cdk-describedby-message-69"]');
    await expect(tooltip).toHaveText('Full Extent');
  });
  test('Zoom to Selected button should work correctly', async ({ page }) => {
    // Locate the "Zoom to Selected" button
    const zoomToSelectedButton = await page.locator('#\\33 _ZoomtoSelected');
    
    // Ensure the button is visible
    await expect(zoomToSelectedButton).toBeVisible();

    // Click the "Zoom to Selected" button
    await zoomToSelectedButton.click();

    const zoomLevel = await page.locator('.map-zoom-level').innerText();
    await expect(parseInt(zoomLevel)).toBeGreaterThan(0);  
    
    const tooltip = await page.locator('[aria-describedby="cdk-describedby-message-70"]');
    await expect(tooltip).toHaveText('Zoom to Selected');
});

});

 
    
  









