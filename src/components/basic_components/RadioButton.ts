import { Page } from '@playwright/test';
import { BasicComponent } from './BasicComponent';

/**
 * RadioButtonComponent class handles interactions with radio button elements on a webpage.
 */
export class RadioButtonComponent extends BasicComponent {
    constructor(page: Page, locator: string) {
        super(page, locator);
    }

    /**
     * Selects the radio button if it is not already selected.
     */
    async select(): Promise<void> {
        if (!(await this.isSelected())) {
            await this.locator.click();
        }
    }

    /**
     * Checks if the radio button is currently selected.
     * 
     * @returns A promise that resolves to a boolean indicating whether the radio button is selected.
     */
    async isSelected(): Promise<boolean> {
        return this.locator.isChecked();
    }
}
