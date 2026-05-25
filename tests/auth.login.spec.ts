import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('User is redirected to account page after login', async ({ app, page }) => {
    await app.LoginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('/account');
});