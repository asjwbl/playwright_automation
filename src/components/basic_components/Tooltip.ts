import { Page, Locator } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * TooltipComponent class to handle interactions and verifications with tooltips.
 */
export class TooltipComponent extends BasicComponent {
  private tooltipLocator: Locator;

  constructor(
    page: Page,
    elementLocator: string | Locator,
    tooltipLocator: string | Locator
  ) {
    super(page, elementLocator);
    this.tooltipLocator =
      typeof tooltipLocator === 'string'
        ? page.locator(tooltipLocator)
        : tooltipLocator;
  }

  /**
   * Hovers over the element to display the tooltip.
   */
  async hoverToShowTooltip(): Promise<void> {
    await this.locator.hover();
    await this.tooltipLocator.waitFor({ state: 'visible' });
  }

  /**
   * Gets the text content of the tooltip.
   *
   * @returns The text content of the tooltip.
   */
  async getTooltipText(): Promise<string> {
    await this.tooltipLocator.waitFor({ state: 'visible' });
    return (await this.tooltipLocator.textContent())?.trim() || '';
  }

  /**
   * Verifies that the tooltip contains the expected text.
   *
   * @param expectedText - The expected text content of the tooltip.
   */
  async verifyTooltipText(expectedText: string): Promise<void> {
    const tooltipText = await this.getTooltipText();
    if (tooltipText !== expectedText.trim()) {
      throw new Error(
        `Expected tooltip text "${expectedText}", but got "${tooltipText}"`
      );
    }
  }

  /**
   * Checks if the tooltip is visible.
   *
   * @returns True if the tooltip is visible, otherwise false.
   */
  async isTooltipVisible(): Promise<boolean> {
    return this.tooltipLocator.isVisible();
  }

  /**
   * Waits for the tooltip to disappear from the page.
   */
  async waitForTooltipToDisappear(): Promise<void> {
    await this.tooltipLocator.waitFor({ state: 'hidden' });
  }
}
