import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home.page';

[
    { sortingType: 'name,asc', isAscending: true},
    { sortingType: 'name,desc', isAscending: false},
].forEach(({ sortingType, isAscending }) => {
    test(`Verify user can perform sorting by ${sortingType}`, async ({ page }) => {
        const homePage = new HomePage(page);
        await page.goto('/');
        const allProductsNames = await homePage.productName.allTextContents();
        await homePage.sortProducts(`${sortingType}`);
        //await page.getByTestId('sort').selectOption(`${sortingType}`);
        const sortedProductsNames = await homePage.productName.allTextContents();
        const expectedOrder = [...allProductsNames].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a);
        });
        expect(sortedProductsNames).toEqual(expectedOrder);
    });
});


