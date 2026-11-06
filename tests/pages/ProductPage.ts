import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class ProductPage {
  readonly title: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addedToCartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByRole('heading', { name: 'Computing and Internet', exact: true });
    this.quantityInput = page.getByRole('textbox', { name: 'Qty:' });
    this.addToCartButton = page.locator('#add-to-cart-button-13');
    this.addedToCartLink = page.getByRole('link', { name: 'shopping cart', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${STORE_URL}/computing-and-internet`);
  }

  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
