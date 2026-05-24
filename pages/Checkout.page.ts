import { Page, Locator, expect } from "@playwright/test";
import { HeaderFragment} from '../pages/Header.fragment';

export class CheckoutPage {
    page: Page;
    headerFragment: HeaderFragment;
    productQuantity: Locator;
    productPrice: Locator;
    totalPrice: Locator;
    productTitle: Locator;
    proceedBtn: Locator;
    postalCode: Locator;
    houseNumber: Locator;
    creditCardNumber: Locator;
    expirationDate: Locator;
    CVV: Locator;
    cardHolderName: Locator;
    confirmBtn: Locator;
    proceedBtnForLoggedInUser: Locator;
    proceedBtnForFulfilledBillingAddress: Locator;
    paragraphForLoggedInUser: Locator;
    paymentSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerFragment = new HeaderFragment(this.page);
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.productPrice = this.page.getByTestId('product-price');
        this.productTitle = this.page.getByTestId('product-title');
        this.totalPrice = this.page.getByTestId('cart-total');
        this.proceedBtn = this.page.getByTestId('proceed-1');
        this.postalCode = this.page.getByTestId('postal_code');
        this.houseNumber = this.page.getByTestId('house_number');
        this.creditCardNumber = this.page.getByTestId('credit_card_number');
        this.expirationDate = this.page.getByTestId('expiration_date');
        this.CVV = this.page.getByTestId('cvv');
        this.cardHolderName = this.page.getByTestId('card_holder_name');
        this.confirmBtn = this.page.getByTestId('finish');
        this.proceedBtnForLoggedInUser = this.page.getByTestId('proceed-2');
        this.proceedBtnForFulfilledBillingAddress = this.page.getByTestId('proceed-3');
        this.paragraphForLoggedInUser = this.page.locator('div p').first();
        this.paymentSuccessMessage = this.page.getByTestId('payment-success-message');

    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedBtn.click();
    }

    async proceedToCheckoutAsLoggedInUser(): Promise<void> {
        await this.proceedBtnForLoggedInUser.click();
    }

    async proceedToCheckoutWithFulfilledBillingAddress(): Promise<void> {
        await this.proceedBtnForFulfilledBillingAddress.click();
    }

    async fulfillBillingAddress(postalCode: string, houseNumber: string): Promise<void> {
        await this.postalCode.fill(postalCode);
        await this.houseNumber.fill(houseNumber);
        await expect(this.proceedBtnForFulfilledBillingAddress).toBeVisible({timeout: 5000});
        await this.proceedToCheckoutWithFulfilledBillingAddress();
    }

    async selectPaymentMethod(paymentMethod: string): Promise<void> {
        await this.page.getByTestId('payment-method').selectOption(paymentMethod);
    }

    async fulfillCreditCardPayment(creditCardNumber: string, expirationDate: string, CVV: string, cardHolderName: string) {
        await this.creditCardNumber.fill(creditCardNumber);
        await this.expirationDate.fill(expirationDate);
        await this.CVV.fill(CVV);
        await this.cardHolderName.fill(cardHolderName);
        await this.confirmBtn.click();
    }
}