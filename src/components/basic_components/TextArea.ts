import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * TextAreaComponent class to handle interactions with a textarea element on a web page.
 */
export class TextAreaComponent extends BasicComponent {
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Enters text into the textarea.
   *
   * @param text - The text to enter into the textarea.
   */
  async enterText(text: string): Promise<void> {
    try {
      await this.locator.fill(text);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error while entering text in the textarea: ${error.message}`
        );
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Clears the textarea before entering new text.
   */
  async clearText(): Promise<void> {
    try {
      const currentValue = await this.locator.inputValue();
      if (currentValue) {
        await this.locator.fill(''); // Clears the text
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while clearing the textarea: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Retrieves the current value of the textarea.
   *
   * @returns The current text inside the textarea.
   */
  async getValue(): Promise<string | null> {
    try {
      return await this.locator.inputValue();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error while retrieving textarea value: ${error.message}`
        );
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Appends text to the existing value in the textarea.
   *
   * @param text - The text to append to the current value in the textarea.
   */
  async appendText(text: string): Promise<void> {
    try {
      await this.locator.fill(text);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error while appending text to the textarea: ${error.message}`
        );
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }
}
