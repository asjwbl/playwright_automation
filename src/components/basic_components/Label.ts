import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * LabelComponent class to handle interactions with label elements on a web page.
 */
export class LabelComponent extends BasicComponent {
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Retrieves the text content of the label.
   *
   * @returns A string representing the text inside the label.
   */
  async getText(): Promise<string> {
    return (await this.locator.textContent()) || ''; // Fallback to empty string if null
  }

  /**
   * Checks if the label is visible on the page.
   *
   * @returns A boolean indicating whether the label is visible.
   */
  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  /**
   * Clicks on the label element.
   */
  async click(): Promise<void> {
    await this.locator.click();
  }
}
