/* eslint-disable playwright/no-wait-for-selector */
/* eslint-disable playwright/prefer-to-have-count */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable playwright/no-useless-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { test, expect } from '@playwright/test'

test('Verify product mocking', async ({ page }) => {
    // Генеруємо 20 тестових товарів
    const mockProducts = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Test Product ${i + 1}`,
    }));
    
    await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.data = mockProducts;
        json.per_page = 20;
        json.to = 20;
        json.total = 20;      
        await route.fulfill({ response, json });
    });

    await page.goto('/');
    await page.waitForSelector('[data-test^="product"]');

    const productCount = await page.getByTestId('product-name').count();
    await expect(productCount).toBe(20);
});