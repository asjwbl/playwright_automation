import { Page } from '@playwright/test';
import { ButtonComponent } from '../components/basic_components/Button';

/**
 * ViewCartDialog class manages interactions with the checkout dialog modal.
 */
export class ViewCartDialog {
  private page: Page;
  private _continueShoppingButton: ButtonComponent | null = null;
  private _viewCartButton: ButtonComponent | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  // Getter for "Continue Shopping" button (cached)
  get continueShoppingButton(): ButtonComponent {
    if (!this._continueShoppingButton) {
      this._continueShoppingButton = new ButtonComponent(
        this.page,
        'button:has-text("Continue Shopping")'
      );
    }
    return this._continueShoppingButton;
  }

  // Getter for "View Cart" button (cached)
  get viewCartButton(): ButtonComponent {
    if (!this._viewCartButton) {
      this._viewCartButton = new ButtonComponent(
        this.page,
        'u:has-text("View Cart")'
      );
    }
    return this._viewCartButton;
  }

  /**
   * Clicks the "Continue Shopping" button after adding a product to the cart.
   */
  async clickContinueShoppingLink() {
    await this.continueShoppingButton.click();
  }

  /**
   * Clicks the "View Cart" button to navigate to the cart page.
   */
  async clickViewCartLink() {
    await this.viewCartButton.click();
  }
}
