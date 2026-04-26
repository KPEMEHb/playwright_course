import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/Login.page';
import { AccountPage } from '../pages/Account.page';

test('User is redirected to account page after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    await page.goto('/auth/login');
  
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('/account');
    await expect(accountPage.accountTitle).toContainText(/My account/);
    await expect(accountPage.navigationMenu).toContainText('Jane Doe');
});