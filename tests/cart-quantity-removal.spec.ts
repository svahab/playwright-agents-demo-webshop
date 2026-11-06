import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('4. Shopping cart management', () => {
  test('Update cart quantity and remove a product', async ({ page }) => {
    const productPage = new ProductPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // 1. Add one item and verify its initial cart row.
    await productPage.goto();
    await productPage.addToCart();
    await homePage.openCart();
    await expect(cartPage.productRow).toContainText('Computing and Internet');
    await expect(cartPage.productRow).toContainText('10.00');
    await expect(cartPage.productRow.getByRole('textbox')).toHaveValue('1');

    // 2. Update the quantity and verify recalculated totals.
    await cartPage.updateQuantity('3');
    await expect(cartPage.productRow.getByRole('textbox')).toHaveValue('3');
    await expect(cartPage.productRow).toContainText('30.00');
    await expect(page.getByRole('row', { name: /Sub-Total: 30.00/ })).toBeVisible();

    // 3. Remove the product and verify the cart is empty.
    await cartPage.removeProduct();
    await expect(page.getByText('Your Shopping Cart is empty!')).toBeVisible();
    await expect(homePage.cartLink.filter({ hasText: '(0)' })).toBeVisible();
  });
});
