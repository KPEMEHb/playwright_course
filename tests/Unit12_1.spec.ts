import { expect } from '@playwright/test'
import { test } from '../fixtures';

test('Verify user can add product to cart', async ({ app }) => {
    await app.HomePage.openProduct('Slip Joint Pliers');
    
    await expect(app.ProductPage.page).toHaveURL(/product\//);
    await expect(app.ProductPage.productName).toContainText(/Slip Joint Pliers/);
    await expect(app.ProductPage.productPrice).toContainText(/9\.17/);

    await app.ProductPage.addProduct();

    await expect(app.ProductPage.headerFragment.pushNotification).toBeVisible();
    await expect(app.ProductPage.headerFragment.pushNotification).toContainText("Product added to shopping cart");
    await expect(app.ProductPage.headerFragment.pushNotification).toBeHidden({ timeout: 8000 });
    await expect(app.ProductPage.headerFragment.cartQuantity).toHaveCount(1);

    await app.ProductPage.headerFragment.openCart();

    await expect(app.CheckoutPage.page).toHaveURL(/checkout/);
    await expect(app.CheckoutPage.productQuantity).toHaveCount(1);
    await expect(app.CheckoutPage.productTitle).toContainText(/Slip Joint Pliers/);
    await expect(app.CheckoutPage.proceedBtn).toBeVisible();

});