import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header.page';
import { threadCpuUsage } from 'node:process';

export class PaymentCheckoutPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly paymentMethodDropdown: Locator;
  readonly creditCardNumberField: Locator;
  readonly ExpDateField: Locator;
  readonly cvvField: Locator;
  readonly cardHolderNameField: Locator;
  readonly confirmButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.paymentMethodDropdown = page.getByTestId('payment-method');
    this.creditCardNumberField = page.getByTestId('credit_card_number');
    this.ExpDateField = page.getByTestId('expiration_date');
    this.cvvField = page.getByTestId('cvv');
    this.cardHolderNameField = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.successAlert = page.getByTestId('payment-success-message');
  }

  async confirmPayment(): Promise<void> {
    await this.confirmButton.click();
  }

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption({ label: paymentMethod });
  }

  async enterCreditCardNumber(cardNumber: string): Promise<void> {
    await this.creditCardNumberField.fill(cardNumber);
  }

  async enterExpirationDate(expDate: string): Promise<void> {
    await this.ExpDateField.fill(expDate);
  }

  async enterCvv(cvv: string): Promise<void> {
    await this.cvvField.fill(cvv);
  }

  async enterCardHolderName(cardHolderName: string): Promise<void> {
    await this.cardHolderNameField.fill(cardHolderName);
  }
}
