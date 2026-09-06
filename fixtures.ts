import { test as base, expect } from '@playwright/test';
import { AllPages } from './pages/allPages';
import { customer } from './test-data/customer';

type MyFixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

  loggedInApp: async ({ app, page }, use) => {
    await app.homePage.goto();
    await app.homePage.header.navigateToLoginPage();
    await app.loginPage.performLogin(customer.email, customer.password);
    await expect(page).toHaveURL(app.accountPage.path);
    await expect(app.accountPage.accountPageTitle).toHaveText('My account');
    await expect(app.accountPage.header.userMenuDropdown).toHaveText(
      customer.fullName,
    );
    await use(app);
  },
});

export { expect } from '@playwright/test';
