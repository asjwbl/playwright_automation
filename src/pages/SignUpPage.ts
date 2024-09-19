import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {

  // for sign up new suer
  async enterNameAndEmail(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
  }

  async clickSignupButton() {
    await this.page.click('button[data-qa="signup-button"]');
  }

  async verifyNewUserSignupVisible() {
    await this.page.waitForSelector('h2:has-text("New User Signup!")');
  }

  async verifyEnterAccountInformationVisible() {
    await this.page.waitForSelector('h2:has-text("Enter Account Information")');
  }

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
    if (details.title === 'Mr') {
      await this.page.click('input#id_gender1');
    } else {
      await this.page.click('input#id_gender2');
    }
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
    await this.page.check('input#newsletter');
    await this.page.check('input#optin');
  }

  async clickCreateAccountButton() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async verifyAccountCreatedVisible() {
    await this.page.waitForSelector('h2:has-text("Account Created!")');
  }

  async clickContinueButton() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  // for log in 

  async login(username: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', username);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }

  async verifyLoginToYourAccountVisible() {
    await this.page.waitForSelector('h2:has-text("Login to your account")');
  }

  async verifyLoginFailed() {
    await this.page.waitForSelector('p:has-text("Your email or password is incorrect!")');
  }
}
