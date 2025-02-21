import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * ToastComponent class to handle interactions with toast notifications.
 */
export class ToastComponent extends BasicComponent {
  constructor(page: Page, locator: string | Locator) {
    super(page, locator);
  }

  /**
   * Dismisses the toast notification by clicking on it.
   */
  async dismiss(): Promise<void> {
    await this.locator.click();
  }

  /**
   * Checks if a toast notification with the specified message is visible.
   *
   * @param message - The expected message in the toast notification.
   * @returns A boolean indicating whether the toast is visible.
   */
  async isVisibleWithMessage(message: string): Promise<boolean> {
    return this.page.locator(`text=${message}`).isVisible();
  }

  /**
   * Verifies if a toast error message is displayed.
   *
   * @returns A boolean indicating whether an error toast is visible.
   */
  async hasError(): Promise<boolean> {
    return this.page.locator('[data-testid="toast-error"]').isVisible();
  }

  /**
   * Waits for the toast notification to disappear from the page.
   *
   * @param timeout - The maximum time to wait before considering the toast disappeared (default: 5000ms).
   */
  async waitForDismiss(timeout: number = 5000): Promise<void> {
    await this.locator.waitFor({ state: 'detached', timeout });
  }
}
