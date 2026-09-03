import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { CartPage } from './cart.page';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';
import { SignInCheckoutPage } from './signInCheckout.page';
import { BillingAddressCheckoutPage } from './billingAddressCheckout.page';
import { PaymentCheckoutPage } from './paymentCheckout.page';

export class AllPages {
  accountPage: AccountPage;
  cartPage: CartPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  signInCheckoutPage: SignInCheckoutPage;
  billingAddressCheckoutPage: BillingAddressCheckoutPage;
  paymentCheckoutPage: PaymentCheckoutPage;

  constructor(page: Page) {
    this.accountPage = new AccountPage(page);
    this.cartPage = new CartPage(page);
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.signInCheckoutPage = new SignInCheckoutPage(page);
    this.billingAddressCheckoutPage = new BillingAddressCheckoutPage(page);
    this.paymentCheckoutPage = new PaymentCheckoutPage(page);
  }
}
