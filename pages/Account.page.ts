import { Locator, Page } from "@playwright/test";

export class AccountPage {
    page: Page;
    accountTitle: Locator;
    navigationMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountTitle = this.page.getByTestId('page-title');
        this.navigationMenu = this.page.getByTestId('nav-menu');
    }
}