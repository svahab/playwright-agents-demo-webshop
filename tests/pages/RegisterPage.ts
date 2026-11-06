import { type Locator, type Page } from '@playwright/test';

const STORE_URL = 'https://demowebshop.tricentis.com';

export class RegisterPage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Register', exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name:' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name:' });
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm password:' });
    this.registerButton = page.getByRole('button', { name: 'Register', exact: true });
    this.successMessage = page.getByText('Your registration completed');
  }

  async goto(): Promise<void> {
    await this.page.goto(`${STORE_URL}/register`);
  }

  async fill(details: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.fill(details.confirmPassword ?? details.password);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async register(details: { firstName: string; lastName: string; email: string; password: string }): Promise<void> {
    await this.fill(details);
    await this.submit();
  }
}
