import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * LinkComponent class to handle link interactions such as clicking and retrieving the URL.
 * It extends BasicComponent and adds functionality specific to link elements.
 */
export class LinkComponent extends BasicComponent {
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Clicks the link. Playwright automatically waits for the link to be visible and enabled.
   */
  async click(): Promise<void> {
    try {
      await this.locator.click();
    } catch (error: unknown) {
      console.error(`Error clicking the link: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Gets the URL (href attribute) of the link.
   *
   * @returns A string containing the URL of the link.
   */
  async getHref(): Promise<string> {
    try {
      const href = await this.locator.getAttribute('href');
      if (href === null) {
        throw new Error('The href attribute is not found on the link.');
      }
      return href;
    } catch (error: unknown) {
      console.error(
        `Error retrieving the href attribute of the link: ${(error as Error).message}`
      );
      throw error;
    }
  }

  /**
   * Gets the inner text of the link.
   *
   * @returns A string containing the text content of the link.
   */
  async getText(): Promise<string> {
    try {
      return await this.locator.innerText();
    } catch (error: unknown) {
      console.error(`Error getting the link text: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Right-clicks the link.
   */
  async rightClick(): Promise<void> {
    try {
      await this.locator.click({ button: 'right' });
    } catch (error: unknown) {
      console.error(
        `Error right-clicking the link: ${(error as Error).message}`
      );
      throw error;
    }
  }
}
