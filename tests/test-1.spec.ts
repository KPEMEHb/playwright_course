import { expect } from '@playwright/test'
import { test } from '../fixtures';
//import path from 'path';

//const authFile = path.join(__dirname, '../playwright/.auth/user.json');

//test.use({storageState: authFile});

test('User is redirected to account page after login', async ({ loggedInApp }) => {
    await expect(loggedInApp.AccountPage.navigationMenu).toContainText('Jane Doe');
});