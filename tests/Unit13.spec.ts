import { expect } from '@playwright/test'
import { test } from '../fixtures';

enum paymentMethods {
    creditCard = 'credit-card',
    bankTransfer = 'bank-transfer',
    cashOnDelivery = 'cash-on-delivery',
    buyNowPayLater = 'buy-now-pay-later',
    giftCard = 'gift-card',
}


test('Verify user can add product to cart', async ({ loggedInApp }) => {
    await expect(loggedInApp.AccountPage.navigationMenu).toContainText('Jane Doe');
    await loggedInApp.AccountPage.headerFragment.navHome.click();
    await loggedInApp.HomePage.openFirstProduct();
    const productName = await loggedInApp.ProductPage.productName.innerText();
    const productPrice = await loggedInApp.ProductPage.productPrice.innerText();

    await loggedInApp.ProductPage.addProduct();
    await loggedInApp.ProductPage.headerFragment.openCart();    

    await expect(loggedInApp.CheckoutPage.productTitle).toHaveText(productName);
    await expect(loggedInApp.CheckoutPage.productPrice).toHaveText('$'+productPrice);
    await expect(loggedInApp.CheckoutPage.totalPrice).toHaveText('$'+productPrice);

    await loggedInApp.CheckoutPage.proceedToCheckout();

    await expect(loggedInApp.CheckoutPage.paragraphForLoggedInUser).toContainText("you are already logged in. You can proceed to checkout.");
    await expect(loggedInApp.CheckoutPage.proceedBtnForLoggedInUser).toBeVisible();

    await loggedInApp.CheckoutPage.proceedToCheckoutAsLoggedInUser();

    await loggedInApp.CheckoutPage.fulfillBillingAddress('11111', '1');

    await loggedInApp.CheckoutPage.selectPaymentMethod(paymentMethods.creditCard);
    const now = new Date();
    now.setMonth(now.getMonth() + 3);
    const expiration_date: string = `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    await loggedInApp.CheckoutPage.fulfillCreditCardPayment('1111-1111-1111-1111', expiration_date, '111', 'test');
    await expect(loggedInApp.CheckoutPage.paymentSuccessMessage).toHaveText("Payment was successful");
});