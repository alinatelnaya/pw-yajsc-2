import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';

export class BillingAddressCheckoutPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly countryDropdown: Locator;
  readonly postalCodeField: Locator;
  readonly houseNumberField: Locator;
  readonly stateField: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.countryDropdown = page.getByTestId('country');
    this.postalCodeField = page.getByTestId('postal_code');
    this.houseNumberField = page.getByTestId('house_number');
    this.stateField = page.getByTestId('state');
    this.proceedToCheckoutButton = page.getByTestId('proceed-3');
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async selectCountry(country: string): Promise<void> {
    await this.countryDropdown.selectOption({ label: country });
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeField.fill(postalCode);
  }

  async enterHouseNumber(houseNumber: string): Promise<void> {
    await this.houseNumberField.fill(houseNumber);
  }

  async enterState(state: string): Promise<void> {
    await this.stateField.fill(state);
  }
}
