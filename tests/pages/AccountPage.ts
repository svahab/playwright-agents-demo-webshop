import { type Locator, type Page } from '@playwright/test';

export class AccountPage {
  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'My account', exact: true });
  }
}
