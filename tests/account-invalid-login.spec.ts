import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

test.describe('1. Account registration and sign-in', () => {
  test('Reject sign-in with unknown credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // 1. Submit credentials for an account that does not exist.
    await loginPage.goto();
    await loginPage.signIn(`unknown-${Date.now()}@example.test`, 'WrongPassword!2026');
    await expect(loginPage.loginError).toBeVisible();
    await expect(page.getByText('No customer account found')).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
  });
});
