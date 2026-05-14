import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home.page';

[
    { sortingType: 'price,asc', isAscending: true},
    { sortingType: 'price,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ page }) => {        
        const homePage = new HomePage(page);
        await page.goto('/');
        const allProductsPrices = await homePage.productPrice.allTextContents();
        await homePage.sortProducts(`${sortingType}`);
        const sortedProductsPrices = await homePage.productPrice.allTextContents();
        const expectedOrder = [...allProductsPrices].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsPrices).toEqual(expectedOrder);
    });
});


