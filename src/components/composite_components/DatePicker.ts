import { Page, Locator } from '@playwright/test';
import { BasicComponent } from '../basic_components/BasicComponent';

/**
 * DatePickerComponent class to handle interactions with date pickers on a web page.
 */
export class DatePickerComponent extends BasicComponent {
  private dateInput: Locator;
  private calendarPopup: Locator;

  constructor(page: Page, inputLocator: string, calendarPopupLocator: string) {
    super(page, inputLocator);
    this.dateInput = page.locator(inputLocator);
    this.calendarPopup = page.locator(calendarPopupLocator);
  }

  /**
   * Opens the date picker calendar by clicking on the input field.
   */
  async openDatePicker(): Promise<void> {
    try {
      await this.dateInput.click();
      await this.calendarPopup.waitFor({ state: 'visible' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while opening the date picker: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Selects a specific date from the date picker.
   *
   * @param day - The day to select (e.g., '15').
   * @param month - The month to select (0 for January, 1 for February, etc.).
   * @param year - The year to select (e.g., '2024').
   */
  async selectDate(day: string, month: number, year: string): Promise<void> {
    await this.openDatePicker();

    // Select the year from the dropdown or date picker controls
    await this.selectYear(year);

    // Select the month from the dropdown or date picker controls
    await this.selectMonth(month);

    // Select the day from the calendar
    await this.selectDay(day);
  }

  /**
   * Selects a day in the date picker.
   *
   * @param day - The day to select (e.g., '15').
   */
  private async selectDay(day: string): Promise<void> {
    try {
      const dayLocator = this.calendarPopup.locator(`text=${day}`);
      await dayLocator.click();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while selecting the day: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Selects a month in the date picker.
   *
   * @param month - The month to select (0 for January, 1 for February, etc.).
   */
  private async selectMonth(month: number): Promise<void> {
    try {
      const monthLocator = this.calendarPopup.locator(
        `select[aria-label="Month"]`
      );
      await monthLocator.selectOption({ index: month });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while selecting the month: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Selects a year in the date picker.
   *
   * @param year - The year to select (e.g., '2024').
   */
  private async selectYear(year: string): Promise<void> {
    try {
      const yearLocator = this.calendarPopup.locator(
        `select[aria-label="Year"]`
      );
      await yearLocator.selectOption(year);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while selecting the year: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Gets the currently selected date from the input field.
   *
   * @returns The current date in the format 'MM/DD/YYYY' or 'DD/MM/YYYY' depending on locale.
   */
  async getSelectedDate(): Promise<string | null> {
    return await this.dateInput.inputValue();
  }

  /**
   * Closes the date picker calendar.
   */
  async closeDatePicker(): Promise<void> {
    try {
      await this.calendarPopup.press('Escape');
      await this.calendarPopup.waitFor({ state: 'hidden' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error while closing the date picker: ${error.message}`);
      } else {
        console.error(`An unexpected error occurred: ${error}`);
      }
      throw error;
    }
  }
}
