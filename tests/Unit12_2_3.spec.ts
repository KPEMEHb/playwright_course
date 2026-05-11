import { test, expect } from '@playwright/test';

[
    { sortingType: 'name,asc', isAscending: true},
    { sortingType: 'name,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ page }) => {
        await page.goto('/');
        const allProductsNames = await page.getByTestId('product-name').allTextContents();
        await page.getByTestId('sort').selectOption(`${sortingType}`);
        const sortedProductsNames = await page.getByTestId('product-name').allTextContents();
        const expectedOrder = [...allProductsNames].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsNames).toEqual(expectedOrder);
    });
});


