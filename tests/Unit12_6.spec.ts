import { expect } from '@playwright/test'
import { test } from '../fixtures';

enum Categories {
    HandTools = 'Hammer',
    PowerTools = 'Sander',
    Other = 'Fasteners',
}

test('Verify user can filter products by category', async ({ app }) => {
    await app.HomePage.filterProducts(Categories.PowerTools);
    await expect(app.HomePage.productName.first()).toContainText('Sander', {timeout: 10000});
    // await page.waitForFunction(() => {
    //     const firstProduct = document.querySelector('[data-test="product-name"]');
    //     return firstProduct?.textContent?.includes('Sander');
    // });
    const allFilteredProductsNames = await app.HomePage.productName.allTextContents();
    allFilteredProductsNames.forEach((filteredProduct) => {
       expect(filteredProduct).toContain(Categories.PowerTools);
    });
});