import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // 1. Open homepage and click product
  await homePage.goto();
  await homePage.openProductDetails('Slip Joint Pliers');

  // Assert product page navigation & data
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.productPrice).toContainText('9.17');

  // 2. Add to cart & assert alert + header badge
  await productPage.addToCart();

  await expect(productPage.toastAlert).toBeVisible();
  await expect(productPage.toastAlert).toHaveText(
    ' Product added to shopping cart. ',
  );
  await expect(productPage.toastAlert).toBeHidden({ timeout: 8000 });
  await expect(productPage.header.cartQuantity).toHaveText('1');

  // 3. Open Cart & assert checkout page contents
  await productPage.header.navigateToCheckout();

  await expect(page).toHaveURL(cartPage.path);
  await expect(cartPage.cartTableRows).toHaveCount(1);
  await expect(cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(cartPage.proceedToCheckoutButton).toBeVisible();
});
