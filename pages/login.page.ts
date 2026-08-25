import type { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./header.page";

export class LoginPage {
  readonly page: Page;
  readonly path: string = '/auth/login';
  readonly header: HeaderFragment;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.emailField = this.page.getByTestId('email');
    this.passwordField = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-submit');
  }

  // ==========================================
  // Page Actions
  // ==========================================

  /**
   * Navigates directly to the login page URL.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
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
