import { Page } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
}