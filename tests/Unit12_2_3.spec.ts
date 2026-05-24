import { expect } from '@playwright/test'
import { test } from '../fixtures';

[
    { sortingType: 'name,asc', isAscending: true},
    { sortingType: 'name,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ app }) => {
        const allProductsNames = await app.HomePage.productName.allTextContents();
        await app.HomePage.sortProducts(`${sortingType}`);
        //await page.getByTestId('sort').selectOption(`${sortingType}`);
        const sortedProductsNames = await app.HomePage.productName.allTextContents();
        const expectedOrder = [...allProductsNames].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsNames).toEqual(expectedOrder);
    });
});


