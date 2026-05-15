import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/Home.page';
import { ProductPage } from '../pages/Product.page';
import { CheckoutPage } from '../pages/Checkout.page';

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    
    await homePage.openProduct('Slip Joint Pliers');
    
    await expect(productPage.page).toHaveURL(/product\//);
    await expect(productPage.productName).toContainText(/Slip Joint Pliers/);
    await expect(productPage.productPrice).toContainText(/9\.17/);

    await productPage.addProduct();

    await expect(productPage.headerFragment.pushNotification).toBeVisible();
    await expect(productPage.headerFragment.pushNotification).toContainText("Product added to shopping cart");
    await expect(productPage.headerFragment.pushNotification).toBeHidden({ timeout: 8000 });
    await expect(productPage.headerFragment.cartQuantity).toHaveCount(1);

    await productPage.headerFragment.openCart();

    await expect(checkoutPage.page).toHaveURL(/checkout/);
    await expect(checkoutPage.productQuantity).toHaveCount(1);
    await expect(checkoutPage.productTitle).toContainText(/Slip Joint Pliers/);
    await expect(checkoutPage.proceedBtn).toBeVisible();

});