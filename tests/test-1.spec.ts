import { test, expect } from '@playwright/test'
//import { AccountPage } from '../pages/Account.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile});

test('User is redirected to account page after login', async ({ page }) => {
    //const accountPage = new AccountPage(page);
    //await expect(accountPage.navigationMenu).toContainText('Oleks Past');
    await page.goto('/');
    
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});