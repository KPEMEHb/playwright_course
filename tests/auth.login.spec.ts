// import { expect } from '@playwright/test';
// import { test } from '../fixtures';
// import path from 'path';

// const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// test('User is redirected to account page after login', async ({ app, page }) => {
//     await app.LoginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
//     await expect(page).toHaveURL('/account');

//     await page.context().storageState({ path: authFile });
// });