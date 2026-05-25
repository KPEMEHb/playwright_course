import { expect } from '@playwright/test'
import { test } from '../fixtures';

test('User is redirected to account page after login', async ({ loggedInApp }) => {
    await expect(loggedInApp.AccountPage.navigationMenu).toContainText('Jane Doe');
});