import { Page } from "@playwright/test";

export class HomePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openProduct(product: string): Promise<void> {
        await this.page.getByAltText(product).click();
    }
}