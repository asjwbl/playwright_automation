import { PageObjectManager } from '../../src/PageObjectManager';
import { faker } from '@faker-js/faker';

/**
 * Creates a new user by navigating through the sign-up process, filling in
 * details, and verifying account creation.
 * 
 * @param pom - The PageObjectManager instance used to interact with various pages.
 * @param defaultUserDetails - Optional user details. If not provided, random data will be generated.
 * @returns An object containing the user's essential details like email, password, name, etc.
 */
export async function registerNewUser(pom: PageObjectManager, defaultUserDetails?: any) {
  const homePage = pom.getHomePage();
  const signUpPage = pom.getSignUpPage();
  const accountPage = pom.getAccountPage();

  // Generate random details if not provided
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

  // Step 1: Navigate to the sign-in page and initiate the sign-up process
  await homePage.clickSignIn();
  await signUpPage.verifyNewUserSignupVisible();

  // Step 2: Fill in the basic information (name and email), then proceed
  await signUpPage.enterNameAndEmail(userDetails.firstName, userDetails.email);
  await signUpPage.clickSignupButton();
  await signUpPage.verifyEnterAccountInformationVisible();

  // Step 3: Complete the account information form
  await signUpPage.fillAccountInformation(userDetails);
  await signUpPage.clickCreateAccountButton();

  // Step 4: Verify account creation and navigate to the home page
  await signUpPage.verifyAccountCreatedVisible();
  await signUpPage.clickContinueButton();
  await accountPage.verifyLoggedInAsUsernameVisible(userDetails.firstName);

  // Return essential details for further use
  return {
    ...userDetails,
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
  
  // Verify that the correct user is logged in
  await accountPage.verifyLoggedInAsUsernameVisible(name);

  // Step 1: Click the "Delete Account" button
  await accountPage.clickDeleteAccountButton();

  // Step 2: Verify that the account has been successfully deleted
  await accountPage.verifyAccountDeletedVisible();
}

/**
 * Logs out the user from the application.
 * 
 * @param pom - The PageObjectManager instance used to interact with various pages.
 * @param name - The username of the account to log out.
 */
export async function logout(pom: PageObjectManager, name: string) {
  const homePage = pom.getHomePage();
  const accountPage = pom.getAccountPage();

  // Verify that the correct user is logged in
  await accountPage.verifyLoggedInAsUsernameVisible(name);

  // Log the user out
  await homePage.logout();
}
