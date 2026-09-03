import { test, expect } from '../fixtures';
import { customer } from '../test-data/customer';

test('Verify order and payment process', async ({ loggedInApp }) => {
  // 1. Navigate and Select Product
  await loggedInApp.homePage.goto();
  await loggedInApp.homePage.productName.first().click();

  // 2. Fetch expected values on product page before adding
  const expectedProductName = await loggedInApp.productPage.getProductName();
  const expectedProductPrice = await loggedInApp.productPage.getProductPrice();
  await loggedInApp.productPage.addToCart();

  // 3. Cart Validation
  await loggedInApp.productPage.header.navigateToCheckout();

  const actualProductName = (
    await loggedInApp.cartPage.getProductNameInCart()
  ).trim();
  const actualProductPrice = await loggedInApp.cartPage.getProductPriceInCart();
  const actualProductTotal = await loggedInApp.cartPage.getProductTotalPrice();
  const actualCartTotal = await loggedInApp.cartPage.getCartTotal();

  expect(actualProductName).toEqual(expectedProductName);
  expect(actualProductPrice).toEqual(expectedProductPrice);
  expect(actualProductTotal).toEqual(expectedProductPrice);
  expect(actualCartTotal).toEqual(expectedProductPrice);

  // 4. Sign In step
  await loggedInApp.cartPage.proceedToCheckout();
  await expect(loggedInApp.signInCheckoutPage.greetingText).toContainText(
    customer.fullName,
  );
  await loggedInApp.signInCheckoutPage.proceedToCheckout();

  // 5. Billing Address step
  await loggedInApp.billingAddressCheckoutPage.selectCountry(
    customer.address.country,
  );
  await loggedInApp.billingAddressCheckoutPage.enterPostalCode(
    customer.address.postalCode,
  );
  await loggedInApp.billingAddressCheckoutPage.enterHouseNumber(
    customer.address.houseNumber,
  );
  await loggedInApp.billingAddressCheckoutPage.enterState(
    customer.address.state,
  );
  await loggedInApp.billingAddressCheckoutPage.proceedToCheckout();

  // 6. Payment step
  await loggedInApp.paymentCheckoutPage.selectPaymentMethod(
    customer.paymentMethod,
  );
  await loggedInApp.paymentCheckoutPage.enterCreditCardNumber(
    customer.creditCard.cardNumber,
  );
  await loggedInApp.paymentCheckoutPage.enterExpirationDate(
    customer.creditCard.expDate,
  );
  await loggedInApp.paymentCheckoutPage.enterCvv(customer.creditCard.cvv);
  await loggedInApp.paymentCheckoutPage.enterCardHolderName(
    customer.creditCard.cardHolderName,
  );
  await loggedInApp.paymentCheckoutPage.confirmPayment();

  // 7. Verification
  await expect(loggedInApp.paymentCheckoutPage.successAlert).toBeVisible();
});
