import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';

test.describe('2. Product browsing and search', () => {
  test('Find a known product using keyword search', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    // 1. Search for a known catalog item.
    await searchPage.goto();
    await searchPage.search('Computing and Internet');
    const result = page.getByRole('link', { name: 'Computing and Internet', exact: true });
    await expect(result).toBeVisible();

    // 2. Open the matching item and verify its detail page.
    await result.click();
    await expect(productPage.title).toBeVisible();
  });
});
