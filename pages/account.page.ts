import { Locator, Page } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly accountPageTitle: Locator;
  readonly accountPageDescription: Locator;
  readonly favoritesButton: Locator;
  readonly profileButton: Locator;
  readonly invoicesButton: Locator;
  readonly messagesButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.accountPageTitle = page.getByTestId('page-title');
    this.accountPageDescription = page.getByText('Here you can manage your profile, favorites and orders.');
    this.favoritesButton = page.getByTestId('nav-favorites');
    this.profileButton = page.getByTestId('nav-profile');
    this.invoicesButton = page.getByTestId('nav-invoices');
    this.messagesButton = page.getByTestId('nav-messages');
  }

  // ==========================================
  // Account Side-Menu Navigation
  // ==========================================

  /** Navigates to the Favorites page via the side menu. */
  async navigateToFavorites(): Promise<void> {
    await this.favoritesButton.click();
  }

  /** Navigates to the Profile page via the side menu. */
  async navigateToProfile(): Promise<void> {
    await this.profileButton.click();
  }

  /** Navigates to the Invoices page via the side menu. */
  async navigateToInvoices(): Promise<void> {
    await this.invoicesButton.click();
  }

  /** Navigates to the Messages page via the side menu. */
  async navigateToMessages(): Promise<void> {
    await this.messagesButton.click();
  }
}
