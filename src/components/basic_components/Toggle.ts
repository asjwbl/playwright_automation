import { Page } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * ToggleComponent class handles interactions with toggle switch elements on a webpage.
 */
export class ToggleComponent extends BasicComponent {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }

    /**
     * Toggles the switch to the 'on' position if it is not already on.
     */
    async turnOn(): Promise<void> {
        if (!(await this.isChecked())) {
            await this.locator.click();
        }
    }

    /**
     * Toggles the switch to the 'off' position if it is not already off.
     */
    async turnOff(): Promise<void> {
        if (await this.isChecked()) {
            await this.locator.click();
        }
    }

    /**
     * Checks the current state of the toggle.
     * 
     * @returns A promise that resolves to a boolean indicating whether the toggle is in the 'on' position.
     */
    async isChecked(): Promise<boolean> {
        return this.locator.isChecked();
    }
}
