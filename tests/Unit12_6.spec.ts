import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home.page';

enum Categories {
    HandTools = 'Hammer',
    PowerTools = 'Sander',
    Other = 'Fasteners',
}

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    await homePage.filterProducts(Categories.PowerTools);
    await page.waitForFunction(() => {
        const firstProduct = document.querySelector('[data-test="product-name"]');
        return firstProduct?.textContent?.includes('Sander');
    });
    const allFilteredProductsNames = await homePage.productName.allTextContents();
    allFilteredProductsNames.forEach((filteredProduct) => {
       expect(filteredProduct).toContain(Categories.PowerTools);
    });
});