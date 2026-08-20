import { test, expect } from "@playwright/test";
import { customer } from "../test-data/customer";
import { LoginPage } from "../pages/login.page";
import { HeaderFragment } from "../pages/header.page";


test('Verify login with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skip login test on CI env');
  const loginPage = new LoginPage(page);
  const headerFragment = new HeaderFragment(page);
  await page.goto('/');

  // 1. Open login page
  await headerFragment.navigateToLoginPage();

  // 2. Fill in credentials and submit
  await loginPage.performLogin(customer.email, customer.password);

  // 3. Verify successful login navigation and user state
  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId('page-title')).toHaveText('My account');
  await expect(page.getByTestId('nav-menu')).toHaveText(customer.fullName);
});
