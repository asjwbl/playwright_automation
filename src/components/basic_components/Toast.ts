import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * ToastComponent class to handle interactions with toast notifications.
 */
export class ToastComponent extends BasicComponent {
  constructor(page: Page, locator: string) {
    super(page, locator);
  }

  /**
   * Dismisses the toast notification by clicking on it.
   */
  async dismiss(): Promise<void> {
    try {
      await this.locator.click();
    } catch (error: unknown) {
      console.error(
        `Error dismissing the toast notification: ${(error as Error).message}`
      );
      throw error;
    }
  }

  /**
   * Checks if a toast notification with the specified message is visible.
   *
   * @param message - The expected message in the toast notification.
   * @returns A boolean indicating whether the toast is visible.
   */
  async isVisibleWithMessage(message: string): Promise<boolean> {
    try {
      const toast = await this.page.locator(`text=${message}`).isVisible();
      return toast;
    } catch (error: unknown) {
      console.error(
        `Error checking if the toast notification is visible with message: ${(error as Error).message}`
      );
      return false;
    }
  }

  /**
   * Verifies if a toast error message is displayed.
   *
   * @returns A boolean indicating whether an error toast is visible.
   */
  async hasError(): Promise<boolean> {
    try {
      const errorToast = await this.page
        .locator('[data-testid="toast-error"]')
        .isVisible();
      return errorToast;
    } catch (error: unknown) {
      console.error(
        `Error checking for toast error: ${(error as Error).message}`
      );
      return false;
    }
  }

  /**
   * Waits for the toast notification to disappear from the page.
   */
  async waitForDismiss(timeout: number = 5000): Promise<void> {
    try {
      await this.locator.waitFor({ state: 'detached', timeout });
    } catch (error: unknown) {
      console.error(
        `Error waiting for the toast notification to disappear: ${(error as Error).message}`
      );
      throw error;
    }
  }
}
