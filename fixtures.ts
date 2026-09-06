import { test as base, expect } from '@playwright/test';
import { AllPages } from './pages/allPages';
import { customer } from './test-data/customer';

type MyFixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

interface LoginResponse {
  access_token: string;
}

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

  loggedInApp: async ({ app, page, request }, use) => {
    const resp = await request.post(
      'https://api.practicesoftwaretesting.com/users/login',
      {
        data: {
          email: customer.email,
          password: customer.password,
        },
      },
    );
    const jsonData = (await resp.json()) as LoginResponse;
    const token = jsonData.access_token;

    await app.homePage.goto();
    await page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);
    await page.reload();

    await expect(app.homePage.header.userMenuDropdown).toHaveText(
      customer.fullName,
    );
    await use(app);
  },
});

export { expect } from '@playwright/test';
