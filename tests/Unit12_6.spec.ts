import { test, expect } from '@playwright/test';

enum Categories {
    HandTools = 'Hammer',
    PowerTools = 'Sander',
    Other = 'Fasteners',
}

test('Verify user can filter products by category', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(Categories.PowerTools).check();
    await page.waitForFunction(() => {
        const firstProduct = document.querySelector('[data-test="product-name"]');
        return firstProduct?.textContent?.includes('Sander');
    });
    const allFilteredProductsNames = await page.getByTestId('product-name').allTextContents();
    allFilteredProductsNames.forEach((filteredProduct) => {
       expect(filteredProduct).toContain(Categories.PowerTools);
    });
});