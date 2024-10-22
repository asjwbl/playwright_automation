import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * CheckboxComponent class to handle interactions with checkbox elements on a web page.
 *
 * This class provides methods to check, uncheck, and interact with checkbox elements
 * using Playwright locators. It inherits from the BasicComponent class, allowing flexible
 * element location strategies such as CSS selectors, XPath, or Playwright's getBy* methods.
 */
export class CheckboxComponent extends BasicComponent {
  /**
   * Initializes the CheckboxComponent with a locator for the checkbox element.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param selector - The CSS or XPath selector, or an existing Locator object to locate the checkbox element.
   */
  constructor(page: Page, selector: string | Locator) {
    super(page, selector);
  }

  /**
   * Checks the checkbox if it is not already checked.
   *
   * This method ensures that the checkbox is checked. If the checkbox is already checked,
   * no action will be taken.
   */
  async check(): Promise<void> {
    if (!(await this.locator.isChecked())) {
      await this.locator.check();
    }
  }

  /**
   * Unchecks the checkbox if it is currently checked.
   *
   * This method ensures that the checkbox is unchecked. If the checkbox is already unchecked,
   * no action will be taken.
   */
  async uncheck(): Promise<void> {
    if (await this.locator.isChecked()) {
      await this.locator.uncheck();
    }
  }
}
