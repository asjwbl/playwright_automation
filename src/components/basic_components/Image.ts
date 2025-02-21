import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * ImageComponent class to handle interactions with image elements on a web page.
 */
export class ImageComponent extends BasicComponent {
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Retrieves the 'src' attribute (image URL) of the image element.
   *
   * @returns The source URL of the image.
   */
  async getSrc(): Promise<string | null> {
    return this.locator.getAttribute('src');
  }

  /**
   * Retrieves the 'alt' attribute (alternative text) of the image element.
   *
   * @returns The alt text of the image.
   */
  async getAltText(): Promise<string | null> {
    return this.locator.getAttribute('alt');
  }

  /**
   * Verifies if the image is visible on the page.
   *
   * @returns A boolean indicating whether the image is visible.
   */
  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  /**
   * Clicks on the image element.
   */
  async click(): Promise<void> {
    await this.locator.click();
  }
}
