import { Page, Locator } from "@playwright/test";
import { HeaderFragment} from '../pages/Header.fragment';

export class CheckoutPage {
    page: Page;
    headerFragment: HeaderFragment;
    productQuantity: Locator;
    productTitle: Locator;
    proceedBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.headerFragment = new HeaderFragment(this.page);
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.productTitle = this.page.getByTestId('product-title');
        this.proceedBtn = this.page.getByTestId('proceed-1');
    }

    // async addProduct(): Promise<void> {
    //     await this.page.getByTestId('add-to-cart').click();
    // }
}