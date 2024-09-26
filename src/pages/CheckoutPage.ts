import { expect, Page } from '@playwright/test';

/**
 * Checkout Page Object handles all interactions on the checkout page.
 */
export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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
    await this.page.fill('textarea[name="message"]', comment);
  }

  /**
   * Clicks the "Place Order" button.
   */
  async clickPlaceOrderButton() {
    await this.page.click('a:has-text("Place Order")');
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
    await this.page.fill('input[name="name_on_card"]', paymentDetails.nameOnCard);
    await this.page.fill('input[name="card_number"]', paymentDetails.cardNumber);
    await this.page.fill('input[name="cvc"]', paymentDetails.cvc);
    await this.page.fill('input[name="expiry_month"]', paymentDetails.expirationMonth);
    await this.page.fill('input[name="expiry_year"]', paymentDetails.expirationYear);
  }

  /**
   * Clicks the "Pay and Confirm Order" button to complete the purchase.
   */
  async clickPayAndConfirmOrderButton() {
    await this.page.click('button:has-text("Pay and Confirm Order")');
  }

  /**
   * Verifies that the order success message is visible.
   */
  async verifyOrderSuccessMessage() {
    await this.page.waitForSelector('p:has-text("Congratulations! Your order has been confirmed!")');
  }
}
