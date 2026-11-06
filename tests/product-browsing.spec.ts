import { test, expect } from '@playwright/test';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';

test.describe('2. Product browsing and search', () => {
  test('Browse Books and sort products by price', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productPage = new ProductPage(page);

    // 1. Open Books and verify the category shows product listings.
    await catalogPage.gotoBooks();
    await expect(catalogPage.heading).toBeVisible();
    await expect(catalogPage.productLink('Computing and Internet')).toBeVisible();
    await expect(page.getByText('30.00', { exact: true }).first()).toBeVisible();

    // 2. Sort products from lowest to highest price and verify the visible ordering.
    await catalogPage.sortByPriceAscending();
    await expect(catalogPage.sortSelect).toHaveValue(/orderby=10/);
    await expect(catalogPage.productCards.nth(0).getByRole('heading')).toHaveText('Computing and Internet');
    await expect(catalogPage.productCards.nth(1).getByRole('heading')).toHaveText('Health Book');
    await expect(catalogPage.productCards.nth(2).getByRole('heading')).toHaveText('Copy of Computing and Internet EX');
    await expect(catalogPage.productCards.nth(3).getByRole('heading')).toHaveText('Fiction');

    // 3. Open a product and verify the purchase details.
    await catalogPage.productLink('Computing and Internet').click();
    await expect(productPage.title).toBeVisible();
    await expect(page.getByText('Availability: In stock')).toBeVisible();
    await expect(page.getByText('Price: 10.00')).toBeVisible();
    await expect(productPage.quantityInput).toHaveValue('1');
    await expect(productPage.addToCartButton).toBeVisible();
  });
});
