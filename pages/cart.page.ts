import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';

export class CartPage {
  readonly page: Page;
  readonly path: string = '/checkout';
  readonly header: HeaderFragment;
  readonly cartTableRows: Locator;
  readonly productTitle: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.cartTableRows = page.locator('tbody tr');
    this.productTitle = page.getByTestId('product-title');
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
}
