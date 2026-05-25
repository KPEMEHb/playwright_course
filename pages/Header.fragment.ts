import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navigationMenu: Locator;
    pushNotification: Locator;
    cartQuantity: Locator;
    cartLabel: Locator;
    navHome: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationMenu = this.page.getByTestId('nav-menu');
        this.pushNotification = this.page.getByRole('alert');
        this.cartQuantity = this.page.getByTestId('cart-quantity');
        this.cartLabel = this.page.getByTestId('nav-cart');
        this.navHome = this.page.getByTestId('nav-home');
    }

    async openCart(): Promise<void> {
        await this.cartLabel.click();
    }
}