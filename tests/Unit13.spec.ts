import { expect } from '@playwright/test'
import { test } from '../fixtures';


test('Verify user can add product to cart', async ({ loggedInApp }) => {
    await expect(loggedInApp.AccountPage.navigationMenu).toContainText('Jane Doe');
    await loggedInApp.AccountPage.headerFragment.navHome.click();
    await loggedInApp.HomePage.openFirstProduct();
    const ProductName = await loggedInApp.ProductPage.productName.innerText();
    const ProductPrice = await loggedInApp.ProductPage.productPrice.innerText();

    await loggedInApp.ProductPage.addProduct();
    await loggedInApp.ProductPage.headerFragment.openCart();    

    await expect(loggedInApp.CheckoutPage.productTitle).toHaveText(ProductName);
    await expect(loggedInApp.CheckoutPage.productPrice).toHaveText('$'+ProductPrice);
    await expect(loggedInApp.CheckoutPage.totalPrice).toHaveText('$'+ProductPrice);

    await loggedInApp.CheckoutPage.proceedToCheckout();

    await expect(loggedInApp.CheckoutPage.paragraphForLoggedInUser).toContainText("you are already logged in. You can proceed to checkout.");
    await expect(loggedInApp.CheckoutPage.proceedBtnForLoggedInUser).toBeVisible();

    await loggedInApp.CheckoutPage.proceedToCheckoutAsLoggedInUser();

    await loggedInApp.CheckoutPage.fulfillBillingAddress('11111', '1');

    await loggedInApp.CheckoutPage.selectPaymentMethod('credit-card');
    const now = new Date();
    now.setMonth(now.getMonth() + 3);
    const expiration_date: string = `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    await loggedInApp.CheckoutPage.fulfillCreditCardPayment('1111-1111-1111-1111', expiration_date, '111', 'test');
    await expect(loggedInApp.CheckoutPage.paymentSuccessMessage).toHaveText("Payment was successful");
});