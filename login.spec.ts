import {test,expect} from "@playwright/test"

test.only('Login with Valid Credentials', async({page}) => {
    await page.waitForTimeout(6000);
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    await page.fill('input[name="userName"]', 'jhd-fathima');
    await page.fill('input[name="password"]', '1234');
    await expect(page).toHaveTitle(/JHD | Geoportal/); 
    await page.click('button[type="submit"]');


});
test.only('Login with invalid credentials', async ({page})=> {
    await page.waitForTimeout(6000);
    await page.goto('https://www.gto-portal.com/Geoportal-JHD/login');
    await page.fill('input[name="userName"]', 'invalidUsername');
    await page.fill('input[name="password"]', 'invalidpassword');
    await page.click('button:has-text("Login")');
    await expect(page.locator('text= Username or Password is wrong.')).toBeVisible({timeout:10000});
    console.log(await page.content());
    await page.screenshot({ path: 'login-error.png' });
});
