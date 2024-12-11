import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.skip('Login with Valid Credentials', async ({ page }) => {
    //page.on('response',(response)=>
   //console.log('received from: ${response.url()}')
  //})
    // Navigate to login page
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    
   
    await page.waitForLoadState('networkidle');

    
    await page.fill('input[name="userName"]', 'jhd-fathima');
    await page.fill('input[name="password"]', '1234');

    
    await page.click('button[type="submit"]');

    
    await expect(page).toHaveTitle(/JHD | Geoportal/); 
  });

  test.skip('Login with Invalid Credentials', async ({ page }) => {
   
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');

   
    await page.waitForLoadState('networkidle');

    
    await page.fill('input[name="userName"]', 'invalidUsername');
    await page.fill('input[name="password"]', 'invalidpassword');

  
    await page.click('button:has-text("Login")');

   
    const errorMessage = page.locator('text="Username or Password is wrong."'); // Update with correct selector
    await expect(errorMessage).toBeVisible({ timeout: 15000 });

    
    console.log(await page.content());
    await page.screenshot({ path: 'login-error.png' });
  });
});
