import { test, expect } from '../fixtures';

test('Verify user can view product details', async ({ app, page }) => {
  // 1. Open home page and navigate to product details page
  await app.homePage.goto();
  await app.homePage.openProductDetails('Combination Pliers');

  // 2. Verify successful navigation to the product details
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(app.productPage.productName).toHaveText('Combination Pliers');
  await expect(app.productPage.productPrice).toContainText('14.15');
  await expect(app.productPage.addToCartButton).toBeVisible();
  await expect(app.productPage.addToFavoritesButton).toBeVisible();
});
