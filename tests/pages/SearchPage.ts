import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class SearchPage {
  readonly keywordInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.keywordInput = page.getByRole('textbox', { name: 'Search keyword:' });
    this.submitButton = page.locator('form').filter({ has: this.keywordInput }).getByRole('button', { name: 'Search' });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${STORE_URL}/search`);
  }

  async search(keyword: string): Promise<void> {
    await this.keywordInput.fill(keyword);
    await this.submitButton.click();
  }
}
