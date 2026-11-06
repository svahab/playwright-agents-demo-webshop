import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('5. Checkout and order placement', () => {
  test('Block guest checkout when required billing details are missing', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const homePage = new HomePage(page);

    // 1. Add an item, accept terms, and choose guest checkout.
    await productPage.goto();
    await productPage.addToCart();
    await cartPage.goto();
    if (await page.getByText('Your Shopping Cart is empty!').isVisible()) {
      await page.goto('https://demowebshop.tricentis.com/computing-and-internet');
      await page.getByRole('button', { name: /Add to cart/ }).first().click();
      await page.goto('https://demowebshop.tricentis.com/cart');
    }

    page.setDefaultTimeout(15_000);
    await cartPage.acceptTerms();
    await cartPage.checkout();
    await checkoutPage.chooseGuestCheckout();

    // 2. Submit the billing form blank and verify required fields are identified.
    await checkoutPage.continueBilling();
    await expect(page.getByRole('heading', { name: 'Billing address', exact: true })).toBeVisible();
    await expect(page.getByText('First name is required.')).toBeVisible();
    await expect(page.getByText('Last name is required.')).toBeVisible();
    await expect(page.getByText('Email is required.')).toBeVisible();
    await expect(page.getByText('Your order has been successfully processed!')).toHaveCount(0);
    await expect(homePage.cartLink.filter({ hasText: /\([1-9]\d*\)/ })).toBeVisible();
  });
});
