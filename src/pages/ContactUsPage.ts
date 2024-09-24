import { BasePage } from './BasePage';
import path from 'path';

/**
 * Class to handle interactions on the "Contact Us" page.
 */
export class ContactUsPage extends BasePage {

  /**
   * Verifies that the "Get In Touch" text is visible on the contact page.
   */
  async verifyGetInTouchVisible() {
    // Waits for the "Get In Touch" header to be visible on the contact page.
    await this.page.waitForSelector('h2:has-text("Get In Touch")');
  }

  /**
   * Enters the user's name in the name input field.
   * 
   * @param name - The user's name to be entered.
   */
  async enterName(name: string) {
    // Fills in the name input field with the provided name.
    await this.page.fill('input[name="name"]', name);
  }

  /**
   * Enters the user's email address in the email input field.
   * 
   * @param email - The user's email address to be entered.
   */
  async enterEmail(email: string) {
    // Fills in the email input field with the provided email address.
    await this.page.fill('input[name="email"]', email);
  }

  /**
   * Enters the subject of the message in the subject input field.
   * 
   * @param subject - The subject of the message to be entered.
   */
  async enterSubject(subject: string) {
    // Fills in the subject input field with the provided subject.
    await this.page.fill('input[name="subject"]', subject);
  }

  /**
   * Enters the message in the message textarea field.
   * 
   * @param message - The message to be entered.
   */
  async enterMessage(message: string) {
    // Fills in the message textarea field with the provided message.
    await this.page.fill('textarea[name="message"]', message);
  }

  /**
   * Uploads a file by setting the file input with the provided file path.
   * 
   * @param relativeFilePath - The relative path to the file to be uploaded.
   */
  async uploadFile(relativeFilePath: string) {
    // Resolves the relative file path to an absolute path and uploads the file.
    const filePath = path.resolve(relativeFilePath);
    await this.page.setInputFiles('input[name="upload_file"]', filePath);
  }

  /**
   * Clicks the "Submit" button to submit the contact form.
   */
  async clickSubmitButton() {
    // Clicks the "Submit" button to submit the contact form.
    await this.page.click('input[name="submit"]');
  }

  /**
   * Verifies that the success message is visible after form submission.
   */
  async verifySuccessMessageVisible() {
    // Waits for the success message indicating the form submission was successful.
    await this.page.waitForSelector('div:has-text("Success! Your details have been submitted successfully.")');
  }

  /**
   * Clicks the "Home" button to navigate back to the homepage.
   */
  async clickHomeButton() {
    // Clicks the "Home" button to return to the homepage.
    await this.page.click('a:has-text("Home")');
  }
}
