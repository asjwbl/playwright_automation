import { Page } from '@playwright/test';
import { PageObjectManager } from '../../src/PageObjectManager';
import { faker } from '@faker-js/faker';

export async function createNewUser(pom: PageObjectManager) {
  const homePage = pom.getHomePage();
  const signUpPage = pom.getSignUpPage();
  const accountPage = pom.getAccountPage();

  // Generate random user data using Faker
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const birthDay = faker.datatype.number({ min: 1, max: 28 }).toString();
  const birthMonth = faker.datatype.number({ min: 1, max: 12 }).toString();
  const birthYear = faker.datatype.number({ min: 1970, max: 2000 }).toString();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const country = 'Canada';
  const state = faker.location.state();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  const mobileNumber = faker.phone.number();

  await homePage.navigate('/');
  await homePage.verifyHomePageLoaded();
  await homePage.clickSignIn();

  await signUpPage.verifyNewUserSignupVisible();
  await signUpPage.enterNameAndEmail(name, email);
  await signUpPage.clickSignupButton();
  await signUpPage.verifyEnterAccountInformationVisible();

  const userDetails = {
    title: 'Mr',
    name: name,
    email: email,
    password: password,
    birthDay: birthDay,
    birthMonth: birthMonth,
    birthYear: birthYear,
    firstName: firstName,
    lastName: lastName,
    company: company,
    address1: address1,
    address2: address2,
    country: country,
    state: state,
    city: city,
    zipcode: zipcode,
    mobileNumber: mobileNumber
  };

  await signUpPage.fillAccountInformation(userDetails);
  await signUpPage.clickCreateAccountButton();
  await signUpPage.verifyAccountCreatedVisible();
  await signUpPage.clickContinueButton();
  await accountPage.verifyLoggedInAsUsernameVisible(name);
  return { email, password, name };
}

export async function deleteUserAccount(pom: PageObjectManager, name: string) {
  const accountPage = pom.getAccountPage();
  await accountPage.verifyLoggedInAsUsernameVisible(name);
  await accountPage.clickDeleteAccountButton();
  await accountPage.verifyAccountDeletedVisible();
}

export async function logout(pom: PageObjectManager, name: string) {
    const homePage = pom.getHomePage();
    const accountPage = pom.getAccountPage();
    await accountPage.verifyLoggedInAsUsernameVisible(name);
    await homePage.logout();
  }
