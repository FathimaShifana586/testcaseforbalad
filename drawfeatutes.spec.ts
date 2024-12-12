import { test, expect } from '@playwright/test';

test.describe('Draw features', () => {

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

  test('Verify Text Tool Button Functionality', async ({ page }) => {
    const textToolButton = await page.locator('#\\34 _addText');
    await expect(textToolButton).toBeVisible();
    await textToolButton.click();

    const textToolPanel = await page.locator('div[ng-reflect-message="Add Text"]');
    await expect(textToolPanel).toBeVisible();

    console.log('Text Tool is functional.');
    await page.screenshot({ path: 'text-tool.png' });
  });

  test('Verify Modify Tool Button Functionality', async ({ page }) => {
    const modifyToolButton = await page.locator('#\\33 _modify');
    await expect(modifyToolButton).toBeVisible();
    await modifyToolButton.click();

    const modifyToolPanel = await page.locator('div[ng-reflect-message="Modify"]');
    await expect(modifyToolPanel).toBeVisible();

    console.log('Modify Tool is functional.');
    await page.screenshot({ path: 'modify-tool.png' });
  });

  test('Verify Polygon Tool Button Functionality', async ({ page }) => {
    const polygonToolButton = await page.locator('#\\32 _polygon');
    await expect(polygonToolButton).toBeVisible();
    await polygonToolButton.click();

    const polygonToolPanel = await page.locator('div[ng-reflect-message="Polygon"]');
    await expect(polygonToolPanel).toBeVisible();

    console.log('Polygon Tool is functional.');
    await page.screenshot({ path: 'polygon-tool.png' });
  });

  test('Verify Line Tool Button Functionality', async ({ page }) => {
    const lineToolButton = await page.locator('#\\32 _polygon');
    await expect(lineToolButton).toBeVisible();
    await lineToolButton.click();

    const lineToolPanel = await page.locator('div[ng-reflect-message="Line"]');
    await expect(lineToolPanel).toBeVisible();

    console.log('Line Tool is functional.');
    await page.screenshot({ path: 'line-tool.png' });
  });

  test('Verify Point Tool Button Functionality', async ({ page }) => {
    const pointToolButton = await page.locator('#\\30 _point');
    await expect(pointToolButton).toBeVisible();
    await pointToolButton.click();

    const pointToolPanel = await page.locator('div[ng-reflect-message="Point"]');
    await expect(pointToolPanel).toBeVisible();

    console.log('Point Tool is functional.');
    await page.screenshot({ path: 'point-tool.png' });
  });

});


