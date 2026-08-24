import type { Locator, Page } from '@playwright/test';

export type LanguageCode = 'de' | 'el' | 'en' | 'es' | 'fr' | 'nl' | 'tr';

export class HeaderFragment {
  readonly page: Page;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly categoriesDropdown: Locator;
  readonly handToolsCategory: Locator;
  readonly powerToolsCategory: Locator;
  readonly otherCategory: Locator;
  readonly specialToolsCategory: Locator;
  readonly rentalsCategory: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly languageDropdown: Locator;
  readonly userMenuDropdown: Locator;
  readonly myAccountOption: Locator;
  readonly myFavoritesOption: Locator;
  readonly myProfileOption: Locator;
  readonly myInvoicesOption: Locator;
  readonly myMessagesOption: Locator;
  readonly signOutOption: Locator;


  constructor(page: Page) {
    this.page = page;

    // Core navigation
    this.logo = this.page.locator('.navbar .navbar-brand');
    this.homeLink = this.page.getByTestId('nav-home');
    this.contactLink = this.page.getByTestId('nav-contact');
    this.signInLink = this.page.getByTestId('nav-sign-in');

    // Categories
    this.categoriesDropdown = this.page.getByTestId('nav-categories');
    this.handToolsCategory = this.page.getByTestId('nav-hand-tools');
    this.powerToolsCategory = this.page.getByTestId('nav-power-tools');
    this.otherCategory = this.page.getByTestId('nav-other');
    this.specialToolsCategory = this.page.getByTestId('nav-special-tools');
    this.rentalsCategory = this.page.getByTestId('nav-rentals');

    // Languages
    this.languageDropdown = this.page.getByTestId('language-select');

    // Logged in user options
    this.userMenuDropdown = this.page.getByTestId('nav-menu');
    this.myAccountOption = this.page.getByTestId('nav-my-account');
    this.myFavoritesOption = this.page.getByTestId('nav-my-favorites');
    this.myProfileOption = this.page.getByTestId('nav-my-profile');
    this.myInvoicesOption = this.page.getByTestId('nav-my-invoices');
    this.myMessagesOption = this.page.getByTestId('nav-my-messages');
    this.signOutOption = this.page.getByTestId('nav-sign-out');
  }

  // ==========================================
  // Core Navigation
  // ==========================================

  /** Navigates to the homepage by clicking the logo. */
  async navigateToHomePageByLogo(): Promise<void> {
    await this.logo.click();
  }

  /** Navigates to the homepage via the Home link. */
  async navigateToHomePage(): Promise<void> {
    await this.homeLink.click();
  }

  /** Navigates to the contact page. */
  async navigateToContactPage(): Promise<void> {
    await this.contactLink.click();
  }

  /** Navigates to the sign-in / login page. */
  async navigateToLoginPage(): Promise<void> {
    await this.signInLink.click();
  }

  // ==========================================
  // Category Navigation
  // ==========================================

  /** Opens the categories dropdown menu. */
  async openCategoriesDropdown(): Promise<void> {
    await this.categoriesDropdown.click();
  }

  /** Opens categories dropdown and navigates to Hand Tools. */
  async navigateToHandToolsPage(): Promise<void> {
    await this.openCategoriesDropdown();
    await this.handToolsCategory.click();
  }
  /** Opens categories dropdown and navigates to Power Tools. */
  async navigateToPowerToolsPage(): Promise<void> {
    await this.openCategoriesDropdown();
    await this.powerToolsCategory.click();
  }

  /** Opens categories dropdown and navigates to Other tools. */
  async navigateToOtherPage(): Promise<void> {
    await this.openCategoriesDropdown();
    await this.otherCategory.click();
  }

  /** Opens categories dropdown and navigates to Special Tools. */
  async navigateToSpecialToolsPage(): Promise<void> {
    await this.openCategoriesDropdown();
    await this.specialToolsCategory.click();
  }

  /** Opens categories dropdown and navigates to Rentals. */
  async navigateToRentalsPage(): Promise<void> {
    await this.openCategoriesDropdown();
    await this.rentalsCategory.click();
  }

  // ==========================================
  // Language Navigation
  // ==========================================

  /** Opens the language selection dropdown menu. */
  async openLanguageDropdown(): Promise<void> {
    await this.languageDropdown.click();
  }

  /**
   * Gets application language locator according to the specified code.
   * @param code Two-letter ISO language code (e.g., 'en', 'de').
   */
  getLanguageByCode(code: LanguageCode): Locator {
    return this.page.getByTestId(`lang-${code}`);
  }

  /**
   * Switches application language to the specified code.
   * @param code Two-letter ISO language code (e.g., 'en', 'de').
   */
  async changeLanguage(code: LanguageCode): Promise<void> {
    await this.openLanguageDropdown();
    await this.getLanguageByCode(code).click();
  }

  // ==========================================
  // User Navigation
  // ==========================================

  /** Opens the user profile dropdown menu in the header. */
  async openUserMenuDropdown(): Promise<void> {
    await this.userMenuDropdown.click();
  }

  /** Navigates to My Account page via user menu. */
  async navigateToMyAccountViaUserMenu(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.myAccountOption.click();
  }

  /** Navigates to My Favorites page via user menu. */
  async navigateToMyFavoritesViaUserMenu(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.myFavoritesOption.click();
  }

  /** Navigates to My Profile page via user menu. */
  async navigateToMyProfileViaUserMenu(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.myProfileOption.click();
  }

  /** Navigates to My Invoices page via user menu. */
  async navigateToMyInvoicesViaUserMenu(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.myInvoicesOption.click();
  }

  /** Navigates to My Messages page via user menu. */
  async navigateToMyMessagesViaUserMenu(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.myMessagesOption.click();
  }

  /** Logs out the current user via user menu dropdown. */
  async signOut(): Promise<void> {
    await this.openUserMenuDropdown();
    await this.signOutOption.click();
  }
}
