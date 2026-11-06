import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('5. Checkout and order placement', () => {
  test('Require terms acceptance before checkout', async ({ page }) => {
    const productPage = new ProductPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Attempt checkout without accepting terms.
    await productPage.goto();
    await productPage.addToCart();
    await homePage.openCart();
    await cartPage.checkout();
    await expect(page.getByRole('dialog', { name: 'Terms of service' })).toContainText('Please accept the terms of service before the next step.');

    // 2. Accept terms and continue to the guest/register choice.
    await page.getByRole('button', { name: 'close' }).click();
    await cartPage.acceptTerms();
    await cartPage.checkout();
    await expect(page.getByText('Checkout as a guest or register')).toBeVisible();
    await expect(checkoutPage.guestCheckoutButton).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register', exact: true })).toBeVisible();
  });
});
