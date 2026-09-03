import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';

export class CartPage {
  readonly page: Page;
  readonly path: string = '/checkout';
  readonly header: HeaderFragment;
  readonly cartTableRows: Locator;
  readonly productTitle: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly productTotalPrice: Locator;
  readonly cartTotal: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.cartTableRows = page.locator('tbody tr');
    this.productTitle = page.getByTestId('product-title');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productPrice = page.getByTestId('product-price');
    this.productTotalPrice = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
  }

  // ==========================================
  // Page Actions
  // ==========================================

  /**
   * Navigates directly to the Checkout page URL.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async getProductNameInCart(): Promise<string> {
    return await this.productTitle.innerText();
  }

  async getProductPriceInCart(): Promise<string> {
    return await this.productPrice.innerText();
  }

  async getProductTotalPrice(): Promise<string> {
    return await this.productTotalPrice.innerText();
  }

  async getCartTotal(): Promise<string> {
    return await this.cartTotal.innerText();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
