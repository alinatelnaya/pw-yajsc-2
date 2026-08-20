import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.getByTestId('email');
    this.passwordField = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-submit');
  }

  // ==========================================
  // Authentication Actions
  // ==========================================

  /**
   * Fills in user credentials and submits the login form.
   * @param email User email address.
   * @param password User password.
   */
  async performLogin(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
