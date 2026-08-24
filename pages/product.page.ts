import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./header.page";

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('unit-price');
    this.addToCartButton = this.page.getByTestId('add-to-cart');
    this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
  }
}
