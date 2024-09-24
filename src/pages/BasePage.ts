import { Page } from '@playwright/test';

/**
 * Base class to be extended by all specific page classes. It provides common functionality
 * like navigation that can be used by all page objects in the application.
 */
export class BasePage {
  protected page: Page;  // Playwright Page object to interact with the browser.

  /**
   * Constructor to initialize the BasePage with the Playwright Page object.
   * 
   * @param page - The Playwright Page object used to interact with the web page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates the browser to the specified URL.
   * 
   * @param url - The URL of the page to navigate to.
   */
  async navigate(url: string) {
    // Instructs the browser to navigate to the given URL.
    await this.page.goto(url);
  }
}
