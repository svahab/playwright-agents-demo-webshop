import { test, expect } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage';

test.describe('1. Account registration and sign-in', () => {
  test('Reject incomplete registration and mismatched passwords', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // 1. Submit an empty registration form and verify required-field errors.
    await registerPage.goto();
    await registerPage.submit();
    await expect(page.getByText('First name is required.')).toBeVisible();
    await expect(page.getByText('Last name is required.')).toBeVisible();
    await expect(page.getByText('Email is required.')).toBeVisible();
    await expect(page.getByText('Password is required.').first()).toBeVisible();

    // 2. Submit otherwise valid details with mismatched passwords.
    await registerPage.fill({
      firstName: 'Taylor',
      lastName: 'Validation',
      email: `validation-${Date.now()}@example.test`,
      password: 'Shopper!2026',
      confirmPassword: 'Different!2026',
    });
    await registerPage.submit();
    await expect(page.getByText('The password and confirmation password do not match.')).toBeVisible();
    await expect(registerPage.heading).toBeVisible();
  });
});
