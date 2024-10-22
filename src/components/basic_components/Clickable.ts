import { Page } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * Represents a clickable component on a web page, such as buttons or links,
 * with additional actions like hover, double-click, and right-click.
 */
export class ClickableComponent extends BasicComponent {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }

    /**
     * Clicks on the element after ensuring it is visible.
     */
    async click(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.click();
    }

    /**
     * Hovers over the element after ensuring it is visible.
     */
    async hover(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.hover();
    }

    /**
     * Double-clicks on the element after ensuring it is visible.
     */
    async doubleClick(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.dblclick();
    }

    /**
     * Performs a right-click on the element after ensuring it is visible.
     */
    async rightClick(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.click({ button: 'right' });
    }

    /**
     * Focuses on the element after ensuring it is visible.
     */
    async focus(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.focus();
    }

    /**
     * Checks if the element is disabled by checking the 'disabled' attribute.
     * 
     * @returns A boolean indicating whether the element is disabled.
     */
    async isDisabled(): Promise<boolean> {
        const disabled = await this.locator.getAttribute('disabled');
        return disabled !== null;
    }
}
