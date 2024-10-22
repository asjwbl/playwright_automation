import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * LabelComponent class to handle interactions with label elements on a web page.
 */
export class LabelComponent extends BasicComponent {
  constructor(page: Page, locator: string) {
    super(page, locator);
  }

  /**
   * Retrieves the text content of the label.
   *
   * @returns A string representing the text inside the label.
   */
  async getText(): Promise<string | null> {
    try {
      return await this.locator.textContent();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error retrieving label text: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Checks if the label is visible on the page.
   *
   * @returns A boolean indicating whether the label is visible.
   */
  async isVisible(): Promise<boolean> {
    try {
      return await this.locator.isVisible();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error checking label visibility: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Clicks on the label element.
   */
  async click(): Promise<void> {
    try {
      await this.locator.click();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error clicking on the label: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }
}
