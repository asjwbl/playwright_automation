import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * ButtonComponent class to encapsulate interactions with button elements.
 * This class supports initialization with any locator type (CSS/XPath/getBy* methods).
 */
export class ButtonComponent extends BasicComponent {
  /**
   * Initializes the ButtonComponent using different locators, including Playwright's getBy* methods.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param locator - The locator for the button. It can be a string (CSS/XPath) or an existing Playwright Locator.
   */
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Clicks on the button.
   */
  async click(): Promise<void> {
    await this.locator.click();
  }

  /**
   * Gets the text of the button.
   */
  async getText(): Promise<string> {
    return (await this.locator.textContent()) || '';
  }

  /**
   * Checks if the button is enabled.
   */
  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }
}
