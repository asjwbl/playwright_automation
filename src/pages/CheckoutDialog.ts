import { Page } from '@playwright/test';
import { ButtonComponent } from '../components/basic_components/Button';
import { LabelComponent } from '../components/basic_components/Label';

/**
 * CheckoutDialog class manages interactions with the checkout dialog modal.
 */
export class CheckoutDialog {
  private page: Page;
  private _registerLoginLink: ButtonComponent | null = null;
  private _checkoutDialogLabel: LabelComponent | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Getter for the "Register / Login" button (cached for reuse).
   */
  get registerLoginLink(): ButtonComponent {
    if (!this._registerLoginLink) {
      this._registerLoginLink = new ButtonComponent(
        this.page,
        'u:has-text("Register / Login")'
      );
    }
    return this._registerLoginLink;
  }

  /**
   * Getter for the "Checkout" dialog label (cached for reuse).
   */
  get checkoutDialogLabel(): LabelComponent {
    if (!this._checkoutDialogLabel) {
      this._checkoutDialogLabel = new LabelComponent(
        this.page,
        'text="Checkout"'
      );
    }
    return this._checkoutDialogLabel;
  }

  /**
   * Clicks the 'Register / Login' link in the checkout dialog.
   */
  async clickRegisterLoginLink(): Promise<void> {
    await this.registerLoginLink.click();
  }

  /**
   * Verifies that the checkout dialog is visible.
   */
  async verifyDialogVisible(): Promise<void> {
    await this.checkoutDialogLabel.isVisible();
  }
}
