import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class HomePage {
  readonly loginLink: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.cartLink = page.getByRole('link', { name: /Shopping cart/ });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${STORE_URL}/`);
  }

  async logOut(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log out' }).click();
  }

  accountLink(email: string): Locator {
    return this.page.getByRole('link', { name: email, exact: true });
  }

  async openAccount(email: string): Promise<void> {
    await this.accountLink(email).click();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('link', { name: /^Shopping cart \(\d+\)$/ }).click();
  }
}
