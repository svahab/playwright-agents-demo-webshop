import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';

test.describe('2. Product browsing and search', () => {
  test('Handle a search with no matching products', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // 1. Search for a distinctive term that is not in the catalog.
    await searchPage.goto();
    await searchPage.search('zz-no-such-product-938471');
    await expect(page.getByText('No products were found that matched your criteria.')).toBeVisible();
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(0);
  });
});
