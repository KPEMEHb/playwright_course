import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navigationMenu: Locator;
    pushNotification: Locator;
    cartQuantity: Locator;
    cartLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationMenu = this.page.getByTestId('nav-menu');
        this.pushNotification = this.page.getByRole('alert');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
        this.cartLabel = this.page.getByTestId('nav-cart');
    }

    async openCart(): Promise<void> {
        await this.cartLabel.click();
    }
}