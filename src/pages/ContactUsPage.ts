import { BasePage } from './BasePage';
import { InputComponent } from '../components/basic_components/Input';
import { TextAreaComponent } from '../components/basic_components/TextArea';
import { ButtonComponent } from '../components/basic_components/Button';
import path from 'path';

/**
 * Class to handle interactions on the "Contact Us" page.
 */
export class ContactUsPage extends BasePage {
  private _nameInput: InputComponent | null = null;
  private _emailInput: InputComponent | null = null;
  private _subjectInput: InputComponent | null = null;
  private _messageTextArea: TextAreaComponent | null = null;
  private _submitButton: ButtonComponent | null = null;
  private _homeButton: ButtonComponent | null = null;

  // Getter for the Name Input field (cached)
  get nameInput(): InputComponent {
    if (!this._nameInput) {
      this._nameInput = new InputComponent(this.page, 'input[name="name"]');
    }
    return this._nameInput;
  }

  // Getter for the Email Input field (cached)
  get emailInput(): InputComponent {
    if (!this._emailInput) {
      this._emailInput = new InputComponent(this.page, 'input[name="email"]');
    }
    return this._emailInput;
  }

  // Getter for the Subject Input field (cached)
  get subjectInput(): InputComponent {
    if (!this._subjectInput) {
      this._subjectInput = new InputComponent(this.page, 'input[name="subject"]');
    }
    return this._subjectInput;
  }

  // Getter for the Message TextArea (cached)
  get messageTextArea(): TextAreaComponent {
    if (!this._messageTextArea) {
      this._messageTextArea = new TextAreaComponent(this.page, 'textarea[name="message"]');
    }
    return this._messageTextArea;
  }

  // Getter for the Submit Button (cached)
  get submitButton(): ButtonComponent {
    if (!this._submitButton) {
      this._submitButton = new ButtonComponent(this.page, "input[value='Submit']");
    }
    return this._submitButton;
  }

  // Getter for the Home Button (cached)
  get homeButton(): ButtonComponent {
    if (!this._homeButton) {
      this._homeButton = new ButtonComponent(this.page, 'a:has-text("Home")');
    }
    return this._homeButton;
  }

  /**
   * Verifies that the "Get In Touch" text is visible on the contact page.
   */
  async verifyGetInTouchVisible() {
    await this.page.waitForSelector('h2:has-text("Get In Touch")');
  }

  /**
   * Enters the user's name in the name input field.
   * 
   * @param name - The user's name to be entered.
   */
  async enterName(name: string) {
    await this.nameInput.fill(name);
  }

  /**
   * Enters the user's email address in the email input field.
   * 
   * @param email - The user's email address to be entered.
   */
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Enters the subject of the message in the subject input field.
   * 
   * @param subject - The subject of the message to be entered.
   */
  async enterSubject(subject: string) {
    await this.subjectInput.fill(subject);
  }

  /**
   * Enters the message in the message textarea field.
   * 
   * @param message - The message to be entered.
   */
  async enterMessage(message: string) {
    await this.messageTextArea.enterText(message);
  }

  /**
   * Uploads a file by setting the file input with the provided file path.
   * 
   * @param relativeFilePath - The relative path to the file to be uploaded.
   */
  async uploadFile(relativeFilePath: string) {
    const filePath = path.resolve(relativeFilePath);
    await this.page.setInputFiles('input[name="upload_file"]', filePath);
  }

  /**
   * Clicks the "Submit" button to submit the contact form.
   */
  async clickSubmitButton() {
    await this.submitButton.click();
  }

  /**
   * Verifies that the success message is visible after form submission.
   */
  async verifySuccessMessageVisible() {
    await this.page.waitForSelector('.status.alert.alert-success');
  }

  /**
   * Clicks the "Home" button to navigate back to the homepage.
   */
  async clickHomeButton() {
    await this.homeButton.click();
  }
}
