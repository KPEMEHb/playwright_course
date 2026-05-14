import { Page, Locator } from "@playwright/test";
import { HeaderFragment} from '../pages/Header.fragment';

export class HomePage {
    page: Page;
    headerFragment: HeaderFragment;
    productName: Locator;
    productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerFragment = new HeaderFragment(this.page);
        this.productName = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('product-price');
    }

    async openProduct(product: string): Promise<void> {
        await this.page.getByAltText(product).click();
    }

    async sortProducts(sortingType: string): Promise<void> {
        await this.page.getByTestId('sort').selectOption(`${sortingType}`);
    }

    async filterProducts(categoryFilter: string): Promise<void> {
        await this.page.getByLabel(categoryFilter).check();
    }
}