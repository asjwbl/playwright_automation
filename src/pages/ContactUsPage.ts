import { BasePage } from './BasePage';
import path from 'path';

export class ContactUsPage extends BasePage {
  async verifyGetInTouchVisible() {
    await this.page.waitForSelector('h2:has-text("Get In Touch")');
  }

  async enterName(name: string) {
    await this.page.fill('input[name="name"]', name);
  }

  async enterEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async enterSubject(subject: string) {
    await this.page.fill('input[name="subject"]', subject);
  }

  async enterMessage(message: string) {
    await this.page.fill('textarea[name="message"]', message);
  }

  async uploadFile(relativeFilePath: string) {
    const filePath = path.resolve(relativeFilePath);
    await this.page.setInputFiles('input[name="upload_file"]', filePath);
  }

  async clickSubmitButton() {
    await this.page.click('input[name="submit"]');
  }

  async verifySuccessMessageVisible() {
    await this.page.waitForSelector('div:has-text("Success! Your details have been submitted successfully.")');
  }

  async clickHomeButton() {
    await this.page.click('a:has-text("Home")');
  }
}
