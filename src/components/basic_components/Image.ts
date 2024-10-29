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
   * @returns A string representing the source URL of the image.
   */
  async getSrc(): Promise<string | null> {
    try {
      return await this.locator.getAttribute('src');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error retrieving image src: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Retrieves the 'alt' attribute (alternative text) of the image element.
   *
   * @returns A string representing the alt text of the image.
   */
  async getAltText(): Promise<string | null> {
    try {
      return await this.locator.getAttribute('alt');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error retrieving image alt text: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Verifies if the image is visible on the page.
   *
   * @returns A boolean indicating whether the image is visible.
   */
  async isVisible(): Promise<boolean> {
    try {
      return await this.locator.isVisible();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error checking image visibility: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Clicks on the image element.
   */
  async click(): Promise<void> {
    try {
      await this.locator.click();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error clicking on the image: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }
}
