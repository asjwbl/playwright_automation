import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * Represents an autocomplete component on a web page.
 */
export class AutocompleteComponent extends BasicComponent {
  private suggestionSelector?: Locator;
  private sleepTimeBeforeClick?: number;
  private sleepTimeBeforeOpening?: number;

  constructor(
    page: Page,
    locator: string | Locator,
    suggestionSelector?: string,
    sleepTimeBeforeClick?: number,
    sleepTimeBeforeOpening?: number
  ) {
    super(page, locator);
    if (suggestionSelector) {
      this.suggestionSelector = page.locator(suggestionSelector);
    }
    this.sleepTimeBeforeClick = sleepTimeBeforeClick;
    this.sleepTimeBeforeOpening = sleepTimeBeforeOpening;
  }

  /**
   * Sets the value of the autocomplete field and optionally waits before and after setting the value.
   *
   * @param value - The value to enter into the autocomplete field.
   */
  async setValue(value: string): Promise<void> {
    if (this.sleepTimeBeforeOpening) {
      await this.page.waitForTimeout(this.sleepTimeBeforeOpening);
    }

    await this.locator.fill(value);

    if (this.sleepTimeBeforeClick) {
      await this.page.waitForTimeout(this.sleepTimeBeforeClick);
    }

    await this.locator.press('Enter'); // Simulate pressing Enter after input
  }

  /**
   * Waits for suggestions to appear in the autocomplete dropdown.
   * If `suggestionSelector` is provided, it will wait for it. Otherwise, it assumes suggestions are based on text.
   *
   * @param timeout - Optional timeout in milliseconds to wait for suggestions to appear.
   */
  async waitForSuggestions(timeout: number = 1000): Promise<void> {
    if (this.suggestionSelector) {
      await this.suggestionSelector.waitFor({ state: 'visible', timeout });
    } else {
      console.warn(
        'Suggestion selector is not provided, skipping suggestion wait.'
      );
    }
  }

  /**
   * Selects a suggestion from the autocomplete dropdown by matching the text.
   *
   * @param suggestionText - The text of the suggestion to select.
   */
  async selectSuggestion(suggestionText: string): Promise<void> {
    const suggestion = this.page.locator(`text="${suggestionText}"`);
    if (!(await suggestion.isVisible())) {
      throw new Error(`Suggestion with text "${suggestionText}" not found.`);
    }
    await suggestion.click();
  }

  /**
   * Clears the input field by selecting all text and deleting it.
   */
  async clearInput(): Promise<void> {
    const value = await this.locator.inputValue();
    if (value) {
      await this.locator.press('Control+A'); // Select all input
      await this.locator.press('Backspace'); // Delete the content
    }
  }

  /**
   * Dismisses the autocomplete suggestions by pressing the Escape key.
   */
  async dismissSuggestions(): Promise<void> {
    await this.locator.press('Escape');
  }
}
