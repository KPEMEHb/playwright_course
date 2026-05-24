import { expect } from '@playwright/test'
import { test } from '../fixtures';

[
    { sortingType: 'price,asc', isAscending: true},
    { sortingType: 'price,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ app }) => {        
        const allProductsPrices = await app.HomePage.productPrice.allTextContents();
        await app.HomePage.sortProducts(sortingType);
        const sortedProductsPrices = await app.HomePage.productPrice.allTextContents();
        const expectedOrder = [...allProductsPrices].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsPrices).toEqual(expectedOrder);
    });
});


