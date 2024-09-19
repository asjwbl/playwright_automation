import { Browser, Page, chromium, test, expect } from '@playwright/test';
import { PageObjectManager } from '../../src/PageObjectManager';
import { faker } from '@faker-js/faker';
import { createNewUser, deleteUserAccount, logout } from './predefinedSteps';
import path from 'path';
import { products } from '../../src/test_data/productsData';

test.describe('UI test Cases', () => {

  let browser: Browser;
  let page: Page;
  let pom: PageObjectManager;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    pom = new PageObjectManager(page);
  });

  test.afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    await browser.close();
  });

  test('should register a new user', async () => {
    const { name } = await createNewUser(pom);
    await deleteUserAccount(pom, name);
  });

  test('should login a user with correct email and password', async () => {
    const homePage = pom.getHomePage();
    const signUpPage = pom.getSignUpPage();
    const accountPage = pom.getAccountPage();

    const { email, password, name } = await createNewUser(pom);
    await logout(pom, name);

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickSignIn();

    await signUpPage.verifyLoginToYourAccountVisible();
    await signUpPage.login(email, password);

    await accountPage.verifyLoggedInAsUsernameVisible(name);
    await deleteUserAccount(pom, name);
  });

  test('Login with invalid credentials', async () => {
    const homePage = pom.getHomePage();
    const signUpPage = pom.getSignUpPage();
    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickSignIn();
    await signUpPage.login('invalid@example.com', 'invalidpassword');
    await signUpPage.verifyLoginFailed();
  });

  test('should show error when registering with an existing email', async () => {
    const { email } = await createNewUser(pom); // Create a user to ensure the email is already registered

    const homePage = pom.getHomePage();
    const signUpPage = pom.getSignUpPage();
    await homePage.logout();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickSignIn();

    await signUpPage.verifyNewUserSignupVisible();
    await signUpPage.enterNameAndEmail('Test User', email); // Use the existing email
    await signUpPage.clickSignupButton();

    // Verify the error message
    const errorMessage = await page.locator('p:has-text("Email Address already exist!")');
    await expect(errorMessage).toBeVisible();
  });

  test('should submit the Contact Us form successfully', async () => {
    const homePage = pom.getHomePage();
    const contactUsPage = pom.getContactUsPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickContactUsLink();

    await contactUsPage.verifyGetInTouchVisible();
    await contactUsPage.enterName('Test User');
    await contactUsPage.enterEmail('testuser@example.com');
    await contactUsPage.enterSubject('Test Subject');
    await contactUsPage.enterMessage('This is a test message.');

    const filePath = path.join(__dirname, '../../src/test_data/file.txt'); // Path to the test data file
    await contactUsPage.uploadFile(filePath);

     // Handle the dialog (alert), the dialog handler should be set up before the submit button is clicked to ensure it handles the dialog properly.
     page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    await contactUsPage.clickSubmitButton();

    await contactUsPage.verifySuccessMessageVisible();
    await contactUsPage.clickHomeButton();

    await homePage.verifyHomePageLoaded();
  });

  test('should navigate to the Test Cases page successfully', async () => {
    const homePage = pom.getHomePage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickTestCases();

    // Verify that the user is navigated to the test cases page
    const testCasesPageTitle = await page.title();
    expect(testCasesPageTitle).toBe('Automation Practice Website for UI Testing - Test Cases');
  });

  test('should navigate to the All Products page and verify product details', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickProducts();

    await productsPage.verifyAllProductsPageVisible();
    await productsPage.verifyProductsListVisible();
    await productsPage.clickFirstProduct();

    await productsPage.verifyProductDetailVisible();
    const productDetails = await productsPage.verifyProductDetails();

    // Verify product details
    expect(productDetails.productName).toBeTruthy();
    expect(productDetails.category).toBeTruthy();
    expect(productDetails.price).toBeTruthy();
    expect(productDetails.availability).toBeTruthy();
    expect(productDetails.condition).toBeTruthy();
    expect(productDetails.brand).toBeTruthy();
  });

  test('should search for a product and verify the search results', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickProducts();

    await productsPage.verifyAllProductsPageVisible();
    await productsPage.verifyProductsListVisible();
    
    const productName = 'Jeans'; // Example product name
    await productsPage.searchProduct(productName);
    await productsPage.verifySearchedProductsVisible();
    await productsPage.verifySearchResults(productName);
  });

  test('should verify subscription functionality', async () => {
    const homePage = pom.getHomePage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    
    await homePage.scrollToFooter();
    await homePage.verifySubscriptionText();
    await homePage.enterSubscriptionEmail(faker.internet.email());
    await homePage.clickSubscribeButton();
    await homePage.verifySubscriptionSuccessMessage();
  });

  test('should verify subscription functionality in the Cart page', async () => {
    const homePage = pom.getHomePage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    
    await homePage.clickCart();
    await homePage.scrollToFooter();
    await homePage.verifySubscriptionText();
    await homePage.enterSubscriptionEmail(faker.internet.email());
    await homePage.clickSubscribeButton();
    await homePage.verifySubscriptionSuccessMessage();
  });

  test('should add products to the cart and verify their details', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickProducts();

    await productsPage.verifyAllProductsPageVisible();
    await productsPage.verifyProductsListVisible();
    
    await productsPage.addProductToCart(1);
    await productsPage.clickContinueShoppingButton();
    await productsPage.addProductToCart(2);
    await productsPage.clickContinueShoppingButton();
    await productsPage.clickViewCartButton();

    await productsPage.verifyProductsInCart(2); // Ensure there are two products in the cart
    await productsPage.verifyProductDetailsInCart(1, products[0]);
    await productsPage.verifyProductDetailsInCart(2, products[1]);
  });

});
