// CheckoutDialog.ts
import { Page } from '@playwright/test';

/**
 * CheckoutDialog class manages interactions with the checkout dialog modal.
 */
export class CheckoutDialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Clicks the 'Register / Login' link on the Cart page.
     */
    async clickRegisterLoginLink() {
        // Waits for and clicks the "Register / Login" link
        await this.page.click('u:has-text("Register / Login")');
    }

    /**
     * Verifies that the checkout dialog is visible.
     */
    async verifyDialogVisible() {
        await this.page.waitForSelector('text="Checkout"', { state: 'visible' });
    }
}
