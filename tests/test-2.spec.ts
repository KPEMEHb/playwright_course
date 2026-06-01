import { expect } from '@playwright/test'
import { test } from '../fixtures';

test('User can view product details',  {
    tag: '@smoke'
}, async ({ app, page }) => {
    await app.HomePage.openProduct('Combination Pliers');
    
    await expect(page).toHaveURL(/product\//);
    await expect(app.ProductPage.productName).toContainText(/Combination Pliers/);
    await expect(app.ProductPage.productPrice).toContainText(/14\.15/);
    await expect(app.ProductPage.addToCartBtn).toBeVisible();
    await expect(app.ProductPage.addToFavoritesBtn).toBeVisible();
});