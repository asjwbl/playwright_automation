import { Browser, Page, chromium, test, expect } from '@playwright/test';
import { PageObjectManager } from '../../src/PageObjectManager';
import { faker } from '@faker-js/faker';
import { createNewUser, deleteUserAccount, logout } from './predefinedSteps';
import path from 'path';
import { products } from '../../src/test_data/productsData';

test.describe('UI Test Cases', () => {

  let browser: Browser;
  let page: Page;
  let pom: PageObjectManager;

  // Launch browser before all tests
  test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    pom = new PageObjectManager(page);
  });

  // Close the browser after all tests
  test.afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    await browser.close();
  });

  // Register a new user test case
  test('should register a new user', async () => {
    const { name } = await createNewUser(pom);
    try {
      await deleteUserAccount(pom, name);
    } catch (error) {
      console.error('Error while deleting user account:', error);
    }
  });

  // Login with correct email and password
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
    try {
      await deleteUserAccount(pom, name);
    } catch (error) {
      console.error('Error while deleting user account:', error);
    }
  });

  // Login with invalid credentials test
  test('Login with invalid credentials', async () => {
    const homePage = pom.getHomePage();
    const signUpPage = pom.getSignUpPage();
    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickSignIn();
    await signUpPage.login('invalid@example.com', 'invalidpassword');
    await signUpPage.verifyLoginFailed();
  });

  // Error when registering with an existing email
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
    await expect(errorMessage, 'Expected error message when registering with an existing email').toBeVisible();
  });

  // Submit Contact Us form test case
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

    // Set up dialog handler before clicking submit
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await contactUsPage.clickSubmitButton();

    await contactUsPage.verifySuccessMessageVisible();
    await contactUsPage.clickHomeButton();

    await homePage.verifyHomePageLoaded();
  });

  // Navigate to the Test Cases page
  test('should navigate to the Test Cases page successfully', async () => {
    const homePage = pom.getHomePage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickTestCases();

    const testCasesPageTitle = await page.title();
    expect(testCasesPageTitle).toBe('Automation Practice Website for UI Testing - Test Cases');
  });

  // Navigate to All Products page and verify details
  test('should navigate to the All Products page and verify product details', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();
    const productDetailsPage = pom.getProductDetailsPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickProducts();

    await productsPage.verifyAllProductsPageVisible();
    await productsPage.verifyProductsListVisible();
    await productsPage.clickFirstProduct();

    await productDetailsPage.verifyProductDetailVisible();
    const productDetails = await productDetailsPage.verifyProductDetails();

    // Assert that each product detail field is populated
    expect(productDetails.productName, 'Expected product name to be populated').toBeTruthy();
    expect(productDetails.category, 'Expected product category to be populated').toBeTruthy();
    expect(productDetails.price, 'Expected product price to be populated').toBeTruthy();
    expect(productDetails.availability, 'Expected product availability to be populated').toBeTruthy();
    expect(productDetails.condition, 'Expected product condition to be populated').toBeTruthy();
    expect(productDetails.brand, 'Expected product brand to be populated').toBeTruthy();
  });

  // Search for a product and verify search results
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

  // Verify subscription functionality on Home page
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

  // Verify subscription functionality on Cart page
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

  // Add products to the cart and verify details
  test('should add products to the cart and verify their details', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();
    const cartPage = pom.getCartPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();
    await homePage.clickProducts();

    await productsPage.verifyAllProductsPageVisible();
    await productsPage.verifyProductsListVisible();

    await productsPage.addProductToCart(1);
    await productsPage.clickContinueShoppingButton();
    await productsPage.addProductToCart(2);
    await productsPage.clickViewCartButton();

    await cartPage.verifyProductsInCart(2); // Ensure there are two products in the cart
    await cartPage.verifyProductDetailsInCart(1, products[0]);
    await cartPage.verifyProductDetailsInCart(2, products[1]);
  });

  // Verify product quantity in the cart
  test('should verify the product quantity in the cart', async () => {
    const homePage = pom.getHomePage();
    const productsPage = pom.getProductsPage();
    const productDetailsPage = pom.getProductDetailsPage();
    const cartPage = pom.getCartPage();

    await homePage.navigate('/');
    await homePage.verifyHomePageLoaded();

    await productsPage.clickFirstProduct();
    await productDetailsPage.verifyProductDetailVisible();
    await productDetailsPage.setProductQuantity(4);
    await productDetailsPage.clickAddToCartButton();
    await productDetailsPage.clickViewCartButton();
    await cartPage.verifyCartPageVisible();
    await cartPage.verifyProductQuantityInCart('4');
  });

});
