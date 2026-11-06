import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class CatalogPage {
  readonly heading: Locator;
  readonly sortSelect: Locator;
  readonly productCards: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Books', exact: true });
    this.sortSelect = page.locator('#products-orderby');
    this.productCards = page.locator('.product-item');
  }

  async gotoBooks(): Promise<void> {
    await this.page.goto(`${STORE_URL}/books`);
  }

  async sortByPriceAscending(): Promise<void> {
    await this.sortSelect.selectOption({ label: 'Price: Low to High' });
  }

  productLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }
}
