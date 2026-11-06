import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class CartPage {
  readonly heading: Locator;
  readonly productRow: Locator;
  readonly updateButton: Locator;
  readonly checkoutButton: Locator;
  readonly termsCheckbox: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly countrySelect: Locator;
  readonly postalCodeInput: Locator;
  readonly estimateShippingButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Shopping cart', exact: true });
    this.productRow = page.getByRole('row', { name: /Computing and Internet/ });
    this.updateButton = page.getByRole('button', { name: 'Update shopping cart' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout', exact: true });
    this.termsCheckbox = page.locator('#termsofservice');
    this.couponInput = page.locator('input[name="discountcouponcode"]');
    this.applyCouponButton = page.getByRole('button', { name: 'Apply coupon' });
    this.countrySelect = page.getByRole('combobox', { name: 'Country:' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip / postal code:' });
    this.estimateShippingButton = page.getByRole('button', { name: 'Estimate shipping' });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${STORE_URL}/cart`);
  }

  async updateQuantity(quantity: string): Promise<void> {
    await this.productRow.getByRole('textbox').fill(quantity);
    await this.updateButton.click();
  }

  async removeProduct(): Promise<void> {
    await this.productRow.getByRole('checkbox').check();
    await this.updateButton.click();
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
