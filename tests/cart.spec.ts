import { test, expect } from '../fixtures';

test('Verify user can add product to cart', async ({ app, page }) => {
  // 1. Open homepage and click product
  await app.homePage.goto();
  await app.homePage.openProductDetails('Slip Joint Pliers');

  // Assert product page navigation & data
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(app.productPage.productPrice).toContainText('9.17');

  // 2. Add to cart & assert alert + header badge
  await app.productPage.addToCart();

  await expect(app.productPage.toastAlert).toBeVisible();
  await expect(app.productPage.toastAlert).toHaveText(
    ' Product added to shopping cart. ',
  );
  await expect(app.productPage.toastAlert).toBeHidden({ timeout: 8000 });
  await expect(app.productPage.header.cartQuantity).toHaveText('1');

  // 3. Open Cart & assert checkout page contents
  await app.productPage.header.navigateToCheckout();

  await expect(page).toHaveURL(app.cartPage.path);
  await expect(app.cartPage.cartTableRows).toHaveCount(1);
  await expect(app.cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(app.cartPage.proceedToCheckoutButton).toBeVisible();
});
