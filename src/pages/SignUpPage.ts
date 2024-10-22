import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { CheckboxComponent } from '../components/basic_components/Checkbox';

/**
 * Class to handle interactions on the sign-up and login pages.
 */
export class SignUpPage extends BasePage {
  private _signUpButton: ButtonComponent | null = null;
  private _createAccountButton: ButtonComponent | null = null;
  private _continueButton: ButtonComponent | null = null;
  private _newsletterCheckbox: CheckboxComponent | null = null;
  private _optinCheckbox: CheckboxComponent | null = null;
  private _loginButton: ButtonComponent | null = null;

  // Getter for "Sign Up" button (cached)
  get signUpButton(): ButtonComponent {
    if (!this._signUpButton) {
      this._signUpButton = new ButtonComponent(
        this.page,
        'button[data-qa="signup-button"]'
      );
    }
    return this._signUpButton;
  }

  // Getter for "Create Account" button (cached)
  get createAccountButton(): ButtonComponent {
    if (!this._createAccountButton) {
      this._createAccountButton = new ButtonComponent(
        this.page,
        'button[data-qa="create-account"]'
      );
    }
    return this._createAccountButton;
  }

  // Getter for "Continue" button (cached)
  get continueButton(): ButtonComponent {
    if (!this._continueButton) {
      this._continueButton = new ButtonComponent(
        this.page,
        'a[data-qa="continue-button"]'
      );
    }
    return this._continueButton;
  }

  // Getter for "Newsletter" checkbox (cached)
  get newsletterCheckbox(): CheckboxComponent {
    if (!this._newsletterCheckbox) {
      this._newsletterCheckbox = new CheckboxComponent(
        this.page,
        'input#newsletter'
      );
    }
    return this._newsletterCheckbox;
  }

  // Getter for "Optin" checkbox (cached)
  get optinCheckbox(): CheckboxComponent {
    if (!this._optinCheckbox) {
      this._optinCheckbox = new CheckboxComponent(this.page, 'input#optin');
    }
    return this._optinCheckbox;
  }

  // Getter for "Login" button (cached)
  get loginButton(): ButtonComponent {
    if (!this._loginButton) {
      this._loginButton = new ButtonComponent(
        this.page,
        'button[data-qa="login-button"]'
      );
    }
    return this._loginButton;
  }

  /**
   * Fills in the name and email fields for signing up a new user.
   *
   * @param name - The name of the user to sign up.
   * @param email - The email address of the user to sign up.
   */
  async enterNameAndEmail(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
  }

  /**
   * Clicks the "Sign Up" button to proceed with the registration.
   */
  async clickSignupButton() {
    await this.signUpButton.click();
  }

  /**
   * Verifies that the "New User Signup!" text is visible on the sign-up page.
   */
  async verifyNewUserSignupVisible() {
    await this.page.waitForSelector('h2:has-text("New User Signup!")');
  }

  /**
   * Verifies that the "Enter Account Information" text is visible after signing up.
   */
  async verifyEnterAccountInformationVisible() {
    await this.page.waitForSelector('h2:has-text("Enter Account Information")');
  }

  /**
   * Fills in the detailed account information for the user during registration.
   *
   * @param details - An object containing the account information to fill in the form.
   */
  async fillAccountInformation(details: {
    title: string;
    name: string;
    email: string;
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    // Select gender based on title
    if (details.title === 'Mr') {
      await this.page.click('input#id_gender1');
    } else {
      await this.page.click('input#id_gender2');
    }

    // Fill in all other fields
    await this.page.fill('input#password', details.password);
    await this.page.selectOption('select#days', details.birthDay);
    await this.page.selectOption('select#months', details.birthMonth);
    await this.page.selectOption('select#years', details.birthYear);
    await this.page.fill('input#first_name', details.firstName);
    await this.page.fill('input#last_name', details.lastName);
    await this.page.fill('input#company', details.company);
    await this.page.fill('input#address1', details.address1);
    await this.page.fill('input#address2', details.address2);
    await this.page.selectOption('select#country', details.country);
    await this.page.fill('input#state', details.state);
    await this.page.fill('input#city', details.city);
    await this.page.fill('input#zipcode', details.zipcode);
    await this.page.fill('input#mobile_number', details.mobileNumber);

    // Opt-in for newsletters and offers
    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();
  }

  /**
   * Clicks the "Create Account" button to submit the account creation form.
   */
  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }

  /**
   * Verifies that the "Account Created!" message is visible after successfully creating an account.
   */
  async verifyAccountCreatedVisible() {
    await this.page.waitForSelector('h2:has-text("Account Created!")');
  }

  /**
   * Clicks the "Continue" button after account creation to proceed.
   */
  async clickContinueButton() {
    await this.continueButton.click();
  }

  // Login methods

  /**
   * Logs in a user by entering the email and password and clicking the login button.
   *
   * @param username - The email address of the user to log in.
   * @param password - The password of the user to log in.
   */
  async login(username: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.loginButton.click();
  }

  /**
   * Verifies that the "Login to your account" text is visible on the login page.
   */
  async verifyLoginToYourAccountVisible() {
    await this.page.waitForSelector('h2:has-text("Login to your account")');
  }

  /**
   * Verifies that the login has failed by checking for the error message.
   */
  async verifyLoginFailed() {
    await this.page.waitForSelector(
      'p:has-text("Your email or password is incorrect!")'
    );
  }
}
