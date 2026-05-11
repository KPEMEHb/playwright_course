import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/Home.page';

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    
    await homePage.openProduct('Slip Joint Pliers');
    
    await expect(page).toHaveURL(/product\//);
    await expect(page.getByTestId('product-name')).toContainText(/Slip Joint Pliers/);
    await expect(page.getByTestId('unit-price')).toContainText(/9\.17/);

    await page.getByTestId('add-to-cart').click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText("Product added to shopping cart");
    await expect(page.getByRole('alert')).toBeHidden({ timeout: 8000 });
    await expect(page.getByTestId('cart-quantity')).toHaveCount(1);

    await page.getByTestId('nav-cart').click();

    await expect(page).toHaveURL(/checkout/);
    await expect(page.getByTestId('product-quantity')).toHaveCount(1);
    await expect(page.getByTestId('product-title')).toContainText(/Slip Joint Pliers/);
    await expect(page.getByTestId('proceed-1')).toBeVisible();

});