import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * InputComponent class to encapsulate interactions with input elements.
 * This class supports initialization with any locator type (CSS/XPath/getBy* methods).
 */
export class InputComponent extends BasicComponent {
    /**
     * Initializes the InputComponent using different locators, including Playwright's getBy* methods.
     * 
     * @param page - The Playwright Page object representing the browser tab.
     * @param locator - The locator for the input field. It can be a string (CSS/XPath) or an existing Playwright Locator.
     */
    constructor(page: Page, locator: string | Locator) {
        super(page, locator);
    }

    /**
     * Fills the input field with a value.
     * 
     * @param value - The value to enter into the input field.
     */
    async fill(value: string): Promise<void> {
        await this.locator.fill(value);
    }

    /**
     * Clears the input field.
     */
    async clear(): Promise<void> {
        await this.locator.fill('');  // This clears the input field
    }

    /**
     * Gets the current value of the input field.
     * 
     * @returns The current value of the input.
     */
    async getValue(): Promise<string> {
        return await this.locator.inputValue();
    }

    /**
     * Checks if the input field is enabled.
     * 
     * @returns A boolean indicating whether the input is enabled.
     */
    async isEnabled(): Promise<boolean> {
        return await this.locator.isEnabled();
    }

    /**
     * Checks if the input field is disabled.
     * 
     * @returns A boolean indicating whether the input is disabled.
     */
    async isDisabled(): Promise<boolean> {
        return !(await this.locator.isEnabled());
    }

    /**
     * Focuses on the input field.
     */
    async focus(): Promise<void> {
        await this.locator.focus();
    }
}
