import { test, expect } from '@playwright/test';
import { customer } from '../test-data/customer';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login with valid credentials', async ({ page }) => {
  // test.skip(!!process.env.CI, 'Skip login test on CI env');
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const accountPage = new AccountPage(page);

  // 1. Open home page and navigate to login
  await homePage.goto();
  await homePage.header.navigateToLoginPage();

  // 2. Fill in credentials and submit
  await loginPage.performLogin(customer.email, customer.password);

  // 3. Verify successful login navigation and user state
  await expect(page).toHaveURL(accountPage.path);
  await expect(accountPage.accountPageTitle).toHaveText('My account');
  await expect(accountPage.header.userMenuDropdown).toHaveText(
    customer.fullName,
  );

  // 4. Save state
  await page.context().storageState({ path: authFile });
});
