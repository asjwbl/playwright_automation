import { Page, Locator } from '@playwright/test';

/**
 * BasicComponent class provides a flexible way to locate elements on a web page using
 * different strategies such as CSS selectors, XPath, and Playwright's getBy* methods.
 * It serves as the foundation for building basic components, which are then used to create composite components.
 */
export class BasicComponent {
  protected page: Page;
  protected locator: Locator;

  /**
   * Initializes the BasicComponent with a locator.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param selector - The CSS or XPath selector, or an existing Locator object to locate the element.
   */
  constructor(page: Page, selector: string | Locator) {
    this.page = page;

    // Determines if the selector is a string or a Locator object.
    if (typeof selector === 'string') {
      // If it's an XPath selector (starts with '//'), use XPath.
      if (selector.startsWith('//')) {
        this.locator = page.locator(selector); // XPath locator
      } else {
        // Otherwise, treat it as a CSS selector.
        this.locator = page.locator(selector); // CSS locator
      }
    } else {
      // If it's already a Locator object, use it directly.
      this.locator = selector;
    }
  }

  /**
   * Creates an instance of a component by locating an element by its ARIA role.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param role - The ARIA role to search for (e.g., 'button', 'checkbox').
   * @param name - The accessible name of the element to locate.
   * @returns A new instance of the derived component class.
   */
  static byRole<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    role: AriaRole,
    options?: { name?: string }
  ): T {
    const locator = page.getByRole(role, options);
    return new this(page, locator);
  }

  /**
   * Creates an instance of a component by locating an element by its associated label.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param label - The label text associated with the element.
   * @returns A new instance of the derived component class.
   */
  static byLabel<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    label: string
  ): T {
    const locator = page.getByLabel(label);
    return new this(page, locator);
  }

  /**
   * Creates an instance of a component by locating an element by its placeholder text.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param placeholder - The placeholder text of the element.
   * @returns A new instance of the derived component class.
   */
  static byPlaceholder<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    placeholder: string
  ): T {
    const locator = page.getByPlaceholder(placeholder);
    return new this(page, locator);
  }

  /**
   * Creates an instance of a component by locating an element by its test ID.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param testId - The test ID of the element.
   * @returns A new instance of the derived component class.
   */
  static byTestId<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    testId: string
  ): T {
    const locator = page.getByTestId(testId);
    return new this(page, locator);
  }

  /**
   * Creates an instance of a component by locating an element by its alt text (commonly used for images).
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param altText - The alt text associated with the element.
   * @returns A new instance of the derived component class.
   */
  static byAltText<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    altText: string
  ): T {
    const locator = page.getByAltText(altText);
    return new this(page, locator);
  }

  /**
   * Creates an instance of a component by locating an element by its title attribute.
   *
   * @param page - The Playwright Page object representing the browser tab.
   * @param title - The title attribute of the element.
   * @returns A new instance of the derived component class.
   */
  static byTitle<T extends BasicComponent>(
    this: new (page: Page, locator: Locator) => T,
    page: Page,
    title: string
  ): T {
    const locator = page.getByTitle(title);
    return new this(page, locator);
  }
}
