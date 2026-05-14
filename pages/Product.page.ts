import { Page, Locator } from "@playwright/test";
import { HeaderFragment} from '../pages/Header.fragment';

export class ProductPage {
    page: Page;
    navigationMenu: Locator;
    productName: Locator;
    productPrice: Locator;
    headerFragment: HeaderFragment;

    constructor(page: Page) {
        this.page = page;
        this.navigationMenu = this.page.getByTestId('nav-menu');
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.headerFragment = new HeaderFragment(this.page);
    }

    async addProduct(): Promise<void> {
        await this.page.getByTestId('add-to-cart').click();
    }
}