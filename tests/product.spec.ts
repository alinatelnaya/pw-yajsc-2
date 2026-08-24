import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // 1. Open home page and navigate to product details page
  await homePage.goto();
  await homePage.openProductDetails('Combination Pliers');

  // 2. Verify successful navigation to the product details
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productPage.productName).toHaveText('Combination Pliers');
  await expect(productPage.productPrice).toContainText('14.15');
  await expect(productPage.addToCartButton).toBeVisible();
  await expect(productPage.addToFavoritesButton).toBeVisible();
});
