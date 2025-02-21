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
    await this.locator.click();
  }

  /**
   * Gets the URL (href attribute) of the link.
   *
   * @returns The URL of the link.
   */
  async getHref(): Promise<string> {
    const href = await this.locator.getAttribute('href');
    if (!href) {
      throw new Error('The href attribute is missing from the link.');
    }
    return href;
  }

  /**
   * Gets the inner text of the link.
   *
   * @returns The text content of the link.
   */
  async getText(): Promise<string> {
    return this.locator.innerText();
  }

  /**
   * Right-clicks the link.
   */
  async rightClick(): Promise<void> {
    await this.locator.click({ button: 'right' });
  }
}
