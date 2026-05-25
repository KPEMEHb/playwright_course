import { Locator, Page } from "@playwright/test";
import { HeaderFragment} from '../pages/Header.fragment';

export class AccountPage {
    page: Page;
    accountTitle: Locator;
    navigationMenu: Locator;
    headerFragment: HeaderFragment;

    constructor(page: Page) {
        this.page = page;
        this.accountTitle = this.page.getByTestId('page-title');
        this.navigationMenu = this.page.getByTestId('nav-menu');
        this.headerFragment = new HeaderFragment(this.page);
    }
}