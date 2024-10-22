import { expect, Page } from '@playwright/test';
import { ButtonComponent } from '../components/basic_components/Button';
import { InputComponent } from '../components/basic_components/Input';
import { TextAreaComponent } from '../components/basic_components/TextArea';

/**
 * Checkout Page Object handles all interactions on the checkout page.
 */
export class CheckoutPage {
  private page: Page;

  private _placeOrderButton: ButtonComponent | null = null;
  private _payAndConfirmOrderButton: ButtonComponent | null = null;
  private _orderCommentInput: TextAreaComponent | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  // Getter for "Place Order" button (cached)
  get placeOrderButton(): ButtonComponent {
    if (!this._placeOrderButton) {
      this._placeOrderButton = new ButtonComponent(this.page, 'a:has-text("Place Order")');
    }
    return this._placeOrderButton;
  }

  // Getter for "Pay and Confirm Order" button (cached)
  get payAndConfirmOrderButton(): ButtonComponent {
    if (!this._payAndConfirmOrderButton) {
      this._payAndConfirmOrderButton = new ButtonComponent(this.page, 'button:has-text("Pay and Confirm Order")');
    }
    return this._payAndConfirmOrderButton;
  }

  // Getter for the order comment TextArea (cached)
  get orderCommentInput(): TextAreaComponent {
    if (!this._orderCommentInput) {
      this._orderCommentInput = new TextAreaComponent(this.page, 'textarea[name="message"]');
    }
    return this._orderCommentInput;
  }

  /**
   * Verifies that the address details are displayed on the checkout page.
   * 
   * @param addressDetails - The expected address details to verify.
   */
  async verifyAddressDetails(addressDetails: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  }) {
    const addressText = await this.page.textContent('#address_delivery');
    expect(addressText).toContain(`${addressDetails.firstName} ${addressDetails.lastName}`);
    expect(addressText).toContain(addressDetails.address1);
    expect(addressText).toContain(addressDetails.city);
    expect(addressText).toContain(addressDetails.state);
    expect(addressText).toContain(addressDetails.zipcode);
    expect(addressText).toContain(addressDetails.country);
  }

  /**
   * Verifies that the "Review Your Order" section is visible on the page.
   */
  async verifyReviewYourOrder() {
    await this.page.waitForSelector('h2:has-text("Review Your Order")');
  }

  /**
   * Enters an order comment.
   * 
   * @param comment - The comment to enter for the order.
   */
  async enterOrderComment(comment: string) {
    await this.orderCommentInput.enterText(comment);
  }

  /**
   * Clicks the "Place Order" button.
   */
  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  /**
   * Enters the payment details.
   * 
   * @param paymentDetails - The details of the card to enter.
   */
  async enterPaymentDetails(paymentDetails: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    expirationYear: string;
  }) {
    const nameOnCardInput = new InputComponent(this.page, 'input[name="name_on_card"]');
    const cardNumberInput = new InputComponent(this.page, 'input[name="card_number"]');
    const cvcInput = new InputComponent(this.page, 'input[name="cvc"]');
    const expirationMonthInput = new InputComponent(this.page, 'input[name="expiry_month"]');
    const expirationYearInput = new InputComponent(this.page, 'input[name="expiry_year"]');

    await nameOnCardInput.fill(paymentDetails.nameOnCard);
    await cardNumberInput.fill(paymentDetails.cardNumber);
    await cvcInput.fill(paymentDetails.cvc);
    await expirationMonthInput.fill(paymentDetails.expirationMonth);
    await expirationYearInput.fill(paymentDetails.expirationYear);
  }

  /**
   * Clicks the "Pay and Confirm Order" button to complete the purchase.
   */
  async clickPayAndConfirmOrderButton() {
    await this.payAndConfirmOrderButton.click();
  }

  /**
   * Verifies that the order success message is visible.
   */
  async verifyOrderSuccessMessage() {
    await this.page.waitForSelector('p:has-text("Congratulations! Your order has been confirmed!")');
  }
}
