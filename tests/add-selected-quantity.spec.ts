import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('3. Product selection and adding to cart', () => {
  test('Add a selected quantity of an in-stock product', async ({ page }) => {
    const productPage = new ProductPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // 1. Set the quantity on an in-stock product.
    await productPage.goto();
    await expect(productPage.title).toBeVisible();
    await productPage.setQuantity('2');
    await expect(productPage.quantityInput).toHaveValue('2');

    // 2. Add the selected quantity to the cart.
    await productPage.addToCart();
    await expect(productPage.addedToCartLink).toBeVisible();
    await expect(homePage.cartLink.filter({ hasText: '(2)' })).toBeVisible();

    // 3. Verify the cart line quantity and calculated subtotal.
    await homePage.openCart();
    await expect(cartPage.heading).toBeVisible();
    await expect(cartPage.productRow).toContainText('Computing and Internet');
    await expect(cartPage.productRow.getByRole('textbox')).toHaveValue('2');
    await expect(cartPage.productRow).toContainText('20.00');
  });
});
