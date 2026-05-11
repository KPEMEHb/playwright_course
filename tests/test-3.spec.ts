import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByTestId('category-01KRBW92Q5RWA2NGA57EEHJ9D1').check();
});