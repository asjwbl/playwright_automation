import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * TooltipComponent class to handle interactions and verifications with tooltips.
 */
export class TooltipComponent extends BasicComponent {
    private tooltipLocator: Locator;

    constructor(page: Page, elementLocator: string, tooltipLocator: string) {
        super(page, elementLocator);
        this.tooltipLocator = page.locator(tooltipLocator);
    }

    /**
     * Hovers over the element to display the tooltip.
     */
    async hoverToShowTooltip(): Promise<void> {
        try {
            // Hover over the element to trigger the tooltip
            await this.locator.hover();
            await this.tooltipLocator.waitFor({ state: 'visible' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error while hovering to show the tooltip: ${error.message}`);
            } else {
                console.error(`An unexpected error occurred: ${error}`);
            }
            throw error;
        }
    }

    /**
     * Gets the text content of the tooltip.
     * 
     * @returns The text content of the tooltip.
     */
    async getTooltipText(): Promise<string> {
        try {
            // Ensure the tooltip is visible and return its text content
            await this.tooltipLocator.waitFor({ state: 'visible' });
            return await this.tooltipLocator.textContent() || '';
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error while getting tooltip text: ${error.message}`);
            } else {
                console.error(`An unexpected error occurred: ${error}`);
            }
            throw error;
        }
    }

    /**
     * Verifies that the tooltip contains the expected text.
     * 
     * @param expectedText - The expected text content of the tooltip.
     */
    async verifyTooltipText(expectedText: string): Promise<void> {
        const tooltipText = await this.getTooltipText();
        if (tooltipText.trim() !== expectedText.trim()) {
            throw new Error(`Expected tooltip text "${expectedText}", but got "${tooltipText}"`);
        }
    }

    /**
     * Checks if the tooltip is visible.
     * 
     * @returns True if the tooltip is visible, otherwise false.
     */
    async isTooltipVisible(): Promise<boolean> {
        return await this.tooltipLocator.isVisible();
    }

    /**
     * Waits for the tooltip to disappear from the page.
     */
    async waitForTooltipToDisappear(): Promise<void> {
        try {
            await this.tooltipLocator.waitFor({ state: 'hidden' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error while waiting for the tooltip to disappear: ${error.message}`);
            } else {
                console.error(`An unexpected error occurred: ${error}`);
            }
            throw error;
        }
    }
}
