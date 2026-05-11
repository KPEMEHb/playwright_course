import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Login.page';
//import { AccountPage } from '../pages/Account.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('User is redirected to account page after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('/account');

    await page.context().storageState({ path: authFile });
});