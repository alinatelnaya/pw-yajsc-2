import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';
import { customer } from '../test-data/customer';

export class SignInCheckoutPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly greetingText: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.greetingText = page.getByText(
      `Hello ${customer.fullName}, you are already logged in. You can proceed to checkout.`,
    );
    this.proceedToCheckoutButton = page.getByTestId('proceed-2');
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
