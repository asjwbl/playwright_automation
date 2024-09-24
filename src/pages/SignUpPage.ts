import { BasePage } from './BasePage';

/**
 * Class to handle interactions on the sign-up and login pages.
 */
export class SignUpPage extends BasePage {

  /**
   * Fills in the name and email fields for signing up a new user.
   * 
   * @param name - The name of the user to sign up.
   * @param email - The email address of the user to sign up.
   */
  async enterNameAndEmail(name: string, email: string) {
    // Fills the "Name" and "Email" input fields for the sign-up form.
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
  }

  /**
   * Clicks the "Sign Up" button to proceed with the registration.
   */
  async clickSignupButton() {
    // Clicks the "Sign Up" button to submit the sign-up form.
    await this.page.click('button[data-qa="signup-button"]');
  }

  /**
   * Verifies that the "New User Signup!" text is visible on the sign-up page.
   */
  async verifyNewUserSignupVisible() {
    // Waits for the "New User Signup!" text to be visible, confirming the page has loaded.
    await this.page.waitForSelector('h2:has-text("New User Signup!")');
  }

  /**
   * Verifies that the "Enter Account Information" text is visible after signing up.
   */
  async verifyEnterAccountInformationVisible() {
    // Waits for the "Enter Account Information" section to appear after the sign-up form is submitted.
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
    // Selects the title ("Mr" or "Mrs") based on the user's input.
    if (details.title === 'Mr') {
      await this.page.click('input#id_gender1');
    } else {
      await this.page.click('input#id_gender2');
    }

    // Fills in the rest of the account details form.
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
    
    // Checks the newsletter and opt-in checkboxes.
    await this.page.check('input#newsletter');
    await this.page.check('input#optin');
  }

  /**
   * Clicks the "Create Account" button to submit the account creation form.
   */
  async clickCreateAccountButton() {
    // Clicks the "Create Account" button to finalize the registration process.
    await this.page.click('button[data-qa="create-account"]');
  }

  /**
   * Verifies that the "Account Created!" message is visible after successfully creating an account.
   */
  async verifyAccountCreatedVisible() {
    // Waits for the "Account Created!" message to confirm account creation was successful.
    await this.page.waitForSelector('h2:has-text("Account Created!")');
  }

  /**
   * Clicks the "Continue" button after account creation to proceed.
   */
  async clickContinueButton() {
    // Clicks the "Continue" button to proceed after account creation.
    await this.page.click('a[data-qa="continue-button"]');
  }

  // Login methods

  /**
   * Logs in a user by entering the email and password and clicking the login button.
   * 
   * @param username - The email address of the user to log in.
   * @param password - The password of the user to log in.
   */
  async login(username: string, password: string) {
    // Fills in the email and password fields and clicks the "Login" button.
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }

  /**
   * Verifies that the "Login to your account" text is visible on the login page.
   */
  async verifyLoginToYourAccountVisible() {
    // Waits for the "Login to your account" text to appear, confirming the login page has loaded.
    await this.page.waitForSelector('h2:has-text("Login to your account")');
  }

  /**
   * Verifies that the login has failed by checking for the error message.
   */
  async verifyLoginFailed() {
    // Waits for the error message indicating that the email or password is incorrect.
    await this.page.waitForSelector('p:has-text("Your email or password is incorrect!")');
  }
}
