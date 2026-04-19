import { test, expect } from '@playwright/test'

test('user redirected to account page after login', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();


  // Expect URL to be a certain link.
  await expect(page).toHaveURL('/account');
  // Expect a title is My account.
  await expect(page.getByTestId('page-title')).toContainText(/My account/);
  // Expect username is Jane Doe
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});