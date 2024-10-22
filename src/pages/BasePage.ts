import { Page } from '@playwright/test';

/**
 * Base class to be extended by all specific page classes. It provides common functionality
 * like navigation, waiting for page loads, and title verification that can be used by all
 * page objects in the application.
 */
export class BasePage {
  protected page: Page; // Playwright Page object to interact with the browser.

  /**
   * Constructor to initialize the BasePage with the Playwright Page object.
   *
   * @param page - The Playwright Page object used to interact with the web page.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates the browser to the specified URL, with an optional timeout.
   *
   * @param url - The URL of the page to navigate to.
   * @param timeout - (Optional) Time in milliseconds to wait for navigation to complete.
   */
  async navigate(url: string, timeout: number = 30000): Promise<void> {
    try {
      // Instructs the browser to navigate to the given URL and waits for page load.
      await this.page.goto(url, { timeout });
      console.log(`Successfully navigated to: ${url}`);
    } catch (error) {
      console.error(`Navigation to ${url} failed:`, (error as Error).message);
      throw error;
    }
  }

  /**
   * Waits for the page to fully load by checking for a specific page title.
   *
   * @param expectedTitle - The expected title of the page to verify.
   * @param timeout - (Optional) Time in milliseconds to wait for the title to match.
   */
  async waitForPageLoad(
    expectedTitle: string,
    timeout: number = 30000
  ): Promise<void> {
    try {
      await this.page.waitForFunction(
        (title: string) => document.title === title,
        expectedTitle,
        { timeout }
      );
      console.log(`Page loaded with expected title: ${expectedTitle}`);
    } catch (error) {
      console.error(
        `Page load failed or title mismatch. Expected title: ${expectedTitle}`
      );
      throw error;
    }
  }

  /**
   * Retrieves the current page's title.
   *
   * @returns The title of the current page.
   */
  async getPageTitle(): Promise<string> {
    try {
      const title = await this.page.title();
      console.log(`Current page title: ${title}`);
      return title;
    } catch (error) {
      console.error(`Failed to retrieve page title:`, (error as Error).message);
      throw error;
    }
  }

  /**
   * Reloads the current page.
   *
   * @param timeout - (Optional) Time in milliseconds to wait for reload.
   */
  async reloadPage(timeout: number = 30000): Promise<void> {
    try {
      await this.page.reload({ timeout });
      console.log('Page reloaded successfully');
    } catch (error) {
      console.error('Page reload failed:', (error as Error).message);
      throw error;
    }
  }
}
