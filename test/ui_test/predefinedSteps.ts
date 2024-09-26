import { PageObjectManager } from '../../src/PageObjectManager';
import { faker } from '@faker-js/faker';

/**
 * Creates a new user by navigating through the sign-up process, filling in
 * details, and verifying account creation.
 * 
 * @param pom - The PageObjectManager instance used to interact with various pages.
 * @param defaultUserDetails - Optional user details. If not provided, random data will be generated.
 * @returns An object containing the user's email, password, and name.
 */
export async function registerNewUser(pom: PageObjectManager, defaultUserDetails?: any) {
  const homePage = pom.getHomePage();
  const signUpPage = pom.getSignUpPage();
  const accountPage = pom.getAccountPage();

  // Use provided details or generate random data
  const userDetails = defaultUserDetails || {
    title: 'Mr',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthDay: faker.datatype.number({ min: 1, max: 28 }).toString(),
    birthMonth: faker.datatype.number({ min: 1, max: 12 }).toString(),
    birthYear: faker.datatype.number({ min: 1970, max: 2000 }).toString(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number()
  };

  // Initiate sign-up process
  await homePage.clickSignIn();
  await signUpPage.verifyNewUserSignupVisible();

  // Enter name and email, then proceed to the next step
  await signUpPage.enterNameAndEmail(userDetails.firstName, userDetails.email);
  await signUpPage.clickSignupButton();
  await signUpPage.verifyEnterAccountInformationVisible();

  await signUpPage.fillAccountInformation(userDetails);
  await signUpPage.clickCreateAccountButton();

  // Verify account creation and navigate to the home page
  await signUpPage.verifyAccountCreatedVisible();
  await signUpPage.clickContinueButton();
  await accountPage.verifyLoggedInAsUsernameVisible(userDetails.firstName);

  // Return essential details of the created user for further use
  return {
    name: userDetails.firstName,
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.name,
    lastName: userDetails.lastName,
    address1: userDetails.address1,
    city: userDetails.city,
    state: userDetails.state,
    zipcode: userDetails.zipcode,
    country: userDetails.country,
  };
}

/**
 * Deletes the user account by clicking the delete account button and verifying
 * that the account was deleted.
 * 
 * @param pom - The PageObjectManager instance used to interact with various pages.
 * @param name - The username of the account to delete.
 */
export async function deleteUserAccount(pom: PageObjectManager, name: string) {
  const accountPage = pom.getAccountPage();
  
  // Verify that the user is logged in as the correct username
  await accountPage.verifyLoggedInAsUsernameVisible(name);

  // Initiate the account deletion process
  await accountPage.clickDeleteAccountButton();

  // Confirm that the account has been deleted successfully
  await accountPage.verifyAccountDeletedVisible();
}

/**
 * Logs out the user from the application by verifying that the user is logged in
 * and then clicking the logout button.
 * 
 * @param pom - The PageObjectManager instance used to interact with various pages.
 * @param name - The username of the account to log out.
 */
export async function logout(pom: PageObjectManager, name: string) {
  const homePage = pom.getHomePage();
  const accountPage = pom.getAccountPage();
  
  // Verify that the user is logged in as the correct username
  await accountPage.verifyLoggedInAsUsernameVisible(name);

  // Perform the logout action from the home page
  await homePage.logout();
}
