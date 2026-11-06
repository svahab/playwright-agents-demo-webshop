import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('4. Shopping cart management', () => {
  test('Handle invalid discounts and estimate shipping', async ({ page }) => {
    const productPage = new ProductPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // 1. Add a physical product and open the cart.
    await productPage.goto();
    await productPage.addToCart();
    await homePage.openCart();
    await expect(page.getByText('Discount Code')).toBeVisible();
    await expect(page.locator('strong', { hasText: 'Estimate shipping' })).toBeVisible();

    // 2. Apply an invalid coupon and verify totals are unchanged.
    await cartPage.couponInput.fill('INVALID-COUPON-2026');
    await cartPage.applyCouponButton.click();
    await expect(page.getByText("The coupon code you entered couldn't be applied to your order")).toBeVisible();
    await expect(page.getByRole('row', { name: /Sub-Total: 10.00/ })).toBeVisible();
    await expect(page.getByRole('row', { name: 'Total: 10.00', exact: true })).toBeVisible();

    // 3. Estimate shipping and verify the cart item remains unchanged.
    await cartPage.countrySelect.selectOption({ label: 'United States' });
    await cartPage.postalCodeInput.fill('10001');
    await cartPage.estimateShippingButton.click();
    await expect(page.getByText('Ground (0.00)')).toBeVisible();
    await expect(cartPage.productRow.getByRole('textbox')).toHaveValue('1');
    await expect(page.getByRole('row', { name: 'Total: 10.00', exact: true })).toBeVisible();
  });
});
