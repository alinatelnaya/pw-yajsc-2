import test, { expect } from "@playwright/test";
import {customer} from "../test-data/customer";

test('Verify login with valid credentials', async ({ page }) => {
  // 1. Open login page
  await page.goto('/auth/login');

  // 2. Fill in credentials
  await page.getByTestId('email').fill(customer.email);
  await page.getByTestId('password').fill(customer.password);
  await page.getByTestId('login-submit').click();

  // 3. Verify successful login
  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId('page-title')).toHaveText('My account');
  await expect(page.getByTestId('nav-menu')).toHaveText(customer.username);
})
