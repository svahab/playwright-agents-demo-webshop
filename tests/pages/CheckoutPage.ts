import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly heading: Locator;
  readonly guestCheckoutButton: Locator;
  readonly confirmButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Checkout', exact: true });
    this.guestCheckoutButton = page.getByRole('button', { name: 'Checkout as Guest' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm', exact: true });
  }

  async chooseGuestCheckout(): Promise<void> {
    await this.guestCheckoutButton.click();
  }

  async fillBillingAddress(address: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
    postalCode: string;
    phone: string;
  }): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name:' }).fill(address.firstName);
    await this.page.getByRole('textbox', { name: 'Last name:' }).fill(address.lastName);
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(address.email);
    await this.page.getByRole('combobox', { name: 'Country:' }).selectOption({ label: address.country });
    await this.page.getByRole('combobox', { name: 'State / province:' }).selectOption({ label: address.state });
    await this.page.getByRole('textbox', { name: 'City:' }).fill(address.city);
    await this.page.getByRole('textbox', { name: 'Address 1:' }).fill(address.address);
    await this.page.getByRole('textbox', { name: 'Zip / postal code:' }).fill(address.postalCode);
    await this.page.getByRole('textbox', { name: 'Phone number:' }).fill(address.phone);
  }

  async continueBilling(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
  }

  async continueShippingAddress(): Promise<void> {
    await this.page.locator('.new-address-next-step-button').nth(1).click();
  }

  async continueShippingMethod(): Promise<void> {
    await this.page.locator('.shipping-method-next-step-button').click();
  }

  async continuePaymentMethod(): Promise<void> {
    await this.page.locator('.payment-method-next-step-button').click();
  }

  async continuePaymentInformation(): Promise<void> {
    await this.page.locator('.payment-info-next-step-button').click();
  }

  async confirmOrder(): Promise<void> {
    await this.confirmButton.click();
  }
}
