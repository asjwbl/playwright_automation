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
    await this.locator.fill(text);
  }

  /**
   * Clears the textarea.
   */
  async clearText(): Promise<void> {
    await this.locator.fill('');
  }

  /**
   * Retrieves the current value of the textarea.
   *
   * @returns The current text inside the textarea.
   */
  async getValue(): Promise<string> {
    return this.locator.inputValue();
  }

  /**
   * Appends text to the existing value in the textarea.
   *
   * @param text - The text to append to the current value in the textarea.
   */
  async appendText(text: string): Promise<void> {
    const currentValue = await this.getValue();
    await this.locator.fill(currentValue + text);
  }
}
