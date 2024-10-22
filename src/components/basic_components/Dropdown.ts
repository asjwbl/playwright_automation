import { Page } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * DropdownComponent class to handle dropdown interactions.
 */
export class DropdownComponent extends BasicComponent {
  constructor(page: Page, locator: string) {
    super(page, locator);
  }

  /**
   * Selects an option from the dropdown by value.
   * 
   * @param value - The value of the option to select.
   */
  async selectOptionByValue(value: string): Promise<void> {
    await this.locator.selectOption({ value });
  }

  /**
   * Selects an option from the dropdown by its visible text.
   * 
   * @param label - The visible text of the option to select.
   */
  async selectOptionByLabel(label: string): Promise<void> {
    await this.locator.selectOption({ label });
  }

  /**
   * Selects an option from the dropdown by its index.
   * 
   * @param index - The index of the option to select (0-based).
   */
  async selectOptionByIndex(index: number): Promise<void> {
    await this.locator.selectOption({ index });
  }

  /**
   * Selects an option from the dropdown by its text.
   * 
   * @param text - The text of the option to select.
   */
  async selectOptionByText(text: string): Promise<void> {
    const options = await this.locator.evaluateAll((options: HTMLOptionElement[]) =>
      options.map(option => option.textContent)
    );
    
    const optionIndex = options.indexOf(text);
    if (optionIndex !== -1) {
      await this.selectOptionByIndex(optionIndex);
    } else {
      throw new Error(`Option with text "${text}" not found in dropdown.`);
    }
  }

  /**
   * Gets the currently selected option's value from the dropdown.
   * 
   * @returns A promise that resolves to the value of the currently selected option.
   */
  async getSelectedOptionValue(): Promise<string | null> {
    const selectedOption = await this.locator.inputValue();
    return selectedOption;
  }

  /**
   * Gets the text of the currently selected option from the dropdown.
   * 
   * @returns A promise that resolves to the visible text of the currently selected option.
   */
  async getSelectedOptionText(): Promise<string> {
    const selectedOption = await this.locator.evaluate((dropdown: HTMLSelectElement) => {
      return dropdown.options[dropdown.selectedIndex].text;
    });
    return selectedOption;
  }
}
