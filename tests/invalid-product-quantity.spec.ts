import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('3. Product selection and adding to cart', () => {
  test('Reject an invalid product quantity', async ({ page }) => {
    const productPage = new ProductPage(page);
    const homePage = new HomePage(page);

    // 1. Attempt to add the product with a quantity of zero.
    await productPage.goto();
    await expect(homePage.cartLink.filter({ hasText: '(0)' })).toBeVisible();
    await productPage.setQuantity('0');
    await productPage.addToCart();
    await expect(page.getByText('Quantity should be positive')).toBeVisible();
    await expect(homePage.cartLink.filter({ hasText: '(0)' })).toBeVisible();
  });
});
