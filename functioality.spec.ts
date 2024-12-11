import { test, expect } from '@playwright/test';

test.describe('ProfileMenu Button Test', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Navigating to login page...');
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login', { timeout: 60000 }); // Adjusting timeout for page navigation
    
    console.log('Filling login form...');
    await page.waitForSelector('input[name="userName"]');
    await page.fill('input[name="userName"]', 'JHD-fathima');
    await page.fill('input[name="password"]', '1234');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for page to load...');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }); // Adjust timeout for navigation
    
    console.log('Waiting for profile menu button...');
    await page.waitForSelector('button[ng-click="togglewithactive(\'profilemenu\', \'profilemenu-btn\', \'nav-part2\')"]', { timeout: 60000 });
  });

  test.skip('ProfileMenu button is clickable and opens profile menu', async ({ page }) => {
    const profileMenuButton = await page.locator('button[ng-click="togglewithactive(\'profilemenu\', \'profilemenu-btn\', \'nav-part2\')"]');
    await expect(profileMenuButton).toBeVisible();
    await profileMenuButton.click();

    const profileMenu = await page.locator('#profileMenu');
    await expect(profileMenu).toBeVisible();

    const menuItem = await profileMenu.locator('text=Profile');
    await expect(menuItem).toBeVisible();

    test.only('Language Switcher button should switch the language when clicked', async ({ page }) => {
        
        const languageButton = await page.locator('#langMenu-btn');
        
        
        const initialLanguage = await languageButton.locator('span.d-sm-block').textContent();
        
        
        await languageButton.click();
        
       
        const updatedLanguage = await languageButton.locator('span.d-sm-block').textContent();
        
       
        expect(updatedLanguage).not.toBe(initialLanguage);
      });
    
    });
  });

