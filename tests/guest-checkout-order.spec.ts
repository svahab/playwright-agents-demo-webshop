import { test, expect } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

test.describe('5. Checkout and order placement', () => {
  test('Complete a guest checkout and place a demo order', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const homePage = new HomePage(page);

    // 1. Add one physical item, accept terms, and choose guest checkout.
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
    await expect(checkoutPage.heading).toBeVisible();
    for (const stage of ['Billing address', 'Shipping address', 'Shipping method', 'Payment method', 'Payment information', 'Confirm order']) {
      await expect(page.getByRole('heading', { name: stage, exact: true })).toBeVisible();
    }

    // 2. Enter valid billing details, use the same address for shipping, and continue with Ground shipping.
    await checkoutPage.fillBillingAddress({
      firstName: 'Taylor',
      lastName: 'Shopper',
      email: `guest-${Date.now()}@example.test`,
      country: 'United States',
      state: 'New York',
      city: 'New York',
      address: '123 Test Street',
      postalCode: '10001',
      phone: '2125550100',
    });
    await checkoutPage.continueBilling();
    await expect(page.getByRole('heading', { name: 'Shipping address' })).toBeVisible();
    await checkoutPage.continueShippingAddress();
    await expect(page.getByRole('heading', { name: 'Shipping method' })).toBeVisible();
    await checkoutPage.continueShippingMethod();

    // 3. Use Cash On Delivery and proceed to review the order summary.
    await expect(page.getByRole('heading', { name: 'Payment method' })).toBeVisible();
    await checkoutPage.continuePaymentMethod();
    await expect(page.getByRole('heading', { name: 'Payment information' })).toBeVisible();
    await checkoutPage.continuePaymentInformation();
    await expect(page.getByRole('heading', { name: 'Confirm order' })).toBeVisible();
    await expect(page.getByRole('row', { name: /Computing and Internet/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /^Total:\s*\d+[.]\d{2}$/ })).toBeVisible();

    // 4. Confirm the demo order and verify the completion page.
    await checkoutPage.confirmOrder();
    await expect(page.getByText('Your order has been successfully processed!')).toBeVisible();
    await expect(page.getByText(/Order number:\s*\d+/)).toBeVisible();
    await expect(homePage.cartLink.filter({ hasText: '(0)' })).toBeVisible();
  });
});
