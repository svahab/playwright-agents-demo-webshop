import { test, expect } from '@playwright/test';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

test.describe('1. Account registration and sign-in', () => {
  test('Register a new customer and sign in successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const email = `customer-${Date.now()}@example.test`;
    const password = 'Shopper!2026';

    // 1. Start from a fresh anonymous session and open Register.
    await registerPage.goto();
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();

    // 2. Enter valid customer details, register, and verify success.
    await registerPage.register({ firstName: 'Taylor', lastName: 'Shopper', email, password });
    await expect(registerPage.successMessage).toBeVisible();
    await expect(homePage.accountLink(email)).toBeVisible();

    // 3. Log out, sign in with the new credentials, and verify authentication.
    await homePage.logOut();
    await loginPage.goto();
    await loginPage.signIn(email, password);
    await expect(homePage.accountLink(email)).toBeVisible();

    // 4. Open the account area and log out.
    await homePage.openAccount(email);
    await expect(accountPage.heading).toBeVisible();
    await homePage.logOut();
    await expect(homePage.loginLink).toBeVisible();
  });
});
