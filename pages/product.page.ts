import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;
  readonly toastAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = this.page.getByTestId('product-name');
    this.productPrice = this.page.locator('.price-section');
    this.productQuantity = this.page.getByTestId('quantity');
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
    this.toastAlert = this.page.getByRole('alert');
  }

  /** Adds product to the cart. */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.innerText();
  }

  async getProductQuantity(): Promise<number> {
    return parseInt(await this.productQuantity.innerText(), 10);
  }
}
