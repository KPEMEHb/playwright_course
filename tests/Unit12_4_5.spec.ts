import { test, expect } from '@playwright/test';

[
    { sortingType: 'price,asc', isAscending: true},
    { sortingType: 'price,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ page }) => {        
        await page.goto('/');
        const allProductsPrices = await page.getByTestId('product-price').allTextContents();
        await page.getByTestId('sort').selectOption(`${sortingType}`);
        const sortedProductsPrices = await page.getByTestId('product-price').allTextContents();
        const expectedOrder = [...allProductsPrices].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsPrices).toEqual(expectedOrder);
    });
});


