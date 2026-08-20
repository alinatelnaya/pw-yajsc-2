import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');

  // 1. Open product details page
  await homePage.openProductDetails('Combination Pliers');

  // 2. Verify successful navigation to the product details
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(page.getByTestId('product-name')).toHaveText('Combination Pliers');
  await expect(page.getByTestId('unit-price')).toContainText('14.15');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});
