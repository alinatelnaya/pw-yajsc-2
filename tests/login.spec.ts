import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { customer } from '../test-data/customer';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({ storageState: authFile });

test('Verify login using stored session', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect(homePage.header.userMenuDropdown).toHaveText(customer.fullName);
});
