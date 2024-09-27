import { Page } from '@playwright/test';

/**
 * ViewCartDialog class manages interactions with the checkout dialog modal.
 */
export class ViewCartDialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

        /**
     * Clicks the "Continue Shopping" link after adding a product to the cart.
     */
    async clickContinueShoppingLink() {
        // Clicks the 'Continue Shopping' link to return to the product listing after adding a product to the cart.
        await this.page.click('button:has-text("Continue Shopping")');
    }

    /**
     * Clicks the "View Cart" link to navigate to the cart page.
     */
    async clickViewCartLink() {
        // Clicks the 'View Cart' link in the navigation menu to navigate to the shopping cart page.
        await this.page.click('u:has-text("View Cart")');
    }
}
