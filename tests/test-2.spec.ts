import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/Home.page';

test('User can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    
    await homePage.openProduct('Combination Pliers');
    
    await expect(page).toHaveURL(/product\//);
    await expect(page.getByTestId('product-name')).toContainText(/Combination Pliers/);
    await expect(page.getByTestId('unit-price')).toContainText(/14\.15/);
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});