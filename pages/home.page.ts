import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';
import { SidebarFragment } from './sidebar.page';

export class HomePage {
  readonly page: Page;
  readonly path: string = '/';
  readonly header: HeaderFragment;
  readonly sidebar: SidebarFragment;
  readonly heroBanner: Locator;
  readonly compareBar: Locator;
  readonly clearCompareButton: Locator;
  readonly compareNowButton: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.sidebar = new SidebarFragment(page);
    this.heroBanner = this.page.getByRole('img', { name: 'Banner' });
    this.compareBar = this.page.getByTestId('comparison-bar');
    this.clearCompareButton = this.page.getByTestId('clear-comparison');
    this.compareNowButton = this.page.getByTestId('compare-link');
    this.productName = this.page.getByTestId('product-name');
    this.productPrice = this.page.getByTestId('product-price');
  }

  // ==========================================
  // Private Helpers
  // ==========================================

  /**
   * Finds the card container element for a specific product.
   * @param productName Visible title of the product card.
   */
  private getProductCard(productName: string): Locator {
    return this.page.locator('.card').filter({ hasText: productName });
  }

  // ==========================================
  // Page Actions
  // ==========================================

  /**
   * Navigates directly to the home page URL.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  // ==========================================
  // Product Card Actions
  // ==========================================

  /**
   * Gets all displayed product names.
   * @returns Array of product name strings.
   */
  async getProductNames(): Promise<string[]> {
    return await this.productName.allInnerTexts();
  }

  /**
   * Gets all displayed product prices as numbers (strips `$`).
   * @returns Array of numeric prices.
   */
  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrice.allInnerTexts();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  /**
   * Opens the detail page for a given product by clicking its card.
   * @param productName Visible name of the product.
   */
  async openProductDetails(productName: string): Promise<void> {
    await this.getProductCard(productName).click();
  }

  /**
   * Adds a product to the comparison list via its scale icon.
   * @param productName Visible name of the product to add.
   */
  async addProductToComparison(productName: string): Promise<void> {
    await this.getProductCard(productName).getByTestId('compare-btn').click();
  }

  /**
   * Removes a product from the comparison list via its scale icon.
   * @param productName Visible name of the product to remove.
   */
  async removeProductFromComparison(productName: string): Promise<void> {
    await this.getProductCard(productName).getByTestId('compare-btn').click();
  }

  // ==========================================
  // Comparison Bar Actions
  // ==========================================

  /** Clears all items currently added to the comparison list. */
  async clearComparisonList(): Promise<void> {
    await this.clearCompareButton.click();
  }

  /** Navigates to the dedicated Product Comparison page. */
  async navigateToComparisonPage(): Promise<void> {
    await this.compareNowButton.click();
  }

  // ==========================================
  // Pagination Actions
  // ==========================================

  /**
   * Navigates directly to a specific page number via pagination controls.
   * @param pageNumber The target page number (e.g., 2 or '2').
   */
  async clickPaginationPage(pageNumber: string | number): Promise<void> {
    await this.page.getByRole('button', { name: `Page-${pageNumber}` }).click();
  }

  /** Navigates to the next page of products. */
  async clickNextPage(): Promise<void> {
    await this.page.getByTestId('pagination-next').click();
  }

  /** Navigates to the previous page of products. */
  async clickPreviousPage(): Promise<void> {
    await this.page.getByTestId('pagination-prev').click();
  }

  // TODO: Improve logic for add/remove from comparison
  // TODO: Add several products to comparison
  // TODO: getComparisonCount
}
