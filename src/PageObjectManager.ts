import { Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountPage } from './pages/AccountPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutDialog } from './pages/CheckoutDialog';
import { ViewCartDialog } from './pages/ViewCartDialog';

/**
 * PageObjectManager class is responsible for managing and providing access
 * to different page objects. It ensures that only one instance of each page object
 * is created and reused throughout the test execution.
 */
export class PageObjectManager {
  private page: Page; // The Playwright Page object used for interacting with the browser.
  private homePage!: HomePage; // Instance of HomePage for interacting with the home page.
  private signUpPage!: SignUpPage; // Instance of SignUpPage for interacting with the sign-up page.
  private accountPage!: AccountPage; // Instance of AccountPage for interacting with the user account page.
  private contactUsPage!: ContactUsPage; // Instance of ContactUsPage for interacting with the contact us page.
  private productsPage!: ProductsPage; // Instance of ProductsPage for interacting with the products page.
  private productDetailsPage!: ProductDetailsPage; // Instance of ProductDetailsPage for interacting with product details.
  private cartPage!: CartPage; // Instance of CartPage for interacting with the shopping cart page.
  private checkoutPage!: CheckoutPage; // Instance of CheckoutPage for interacting with the check out page.
  private checkoutDialog!: CheckoutDialog; // Instance of CheckoutDialog for interacting with the check out dialog.
  private viewCartDialog!: ViewCartDialog; // Instance of ViewCartDialog for interacting with the view cart dialog.

  /**
   * Constructor to initialize the PageObjectManager with a Playwright Page object.
   * @param page - The Playwright Page object used for navigating and interacting with the browser.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Provides an instance of HomePage. Creates the instance if it doesn't already exist.
   * @returns {HomePage} The HomePage object.
   */
  getHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }

  /**
   * Provides an instance of SignUpPage. Creates the instance if it doesn't already exist.
   * @returns {SignUpPage} The SignUpPage object.
   */
  getSignUpPage(): SignUpPage {
    if (!this.signUpPage) {
      this.signUpPage = new SignUpPage(this.page);
    }
    return this.signUpPage;
  }

  /**
   * Provides an instance of AccountPage. Creates the instance if it doesn't already exist.
   * @returns {AccountPage} The AccountPage object.
   */
  getAccountPage(): AccountPage {
    if (!this.accountPage) {
      this.accountPage = new AccountPage(this.page);
    }
    return this.accountPage;
  }

  /**
   * Provides an instance of ContactUsPage. Creates the instance if it doesn't already exist.
   * @returns {ContactUsPage} The ContactUsPage object.
   */
  getContactUsPage(): ContactUsPage {
    if (!this.contactUsPage) {
      this.contactUsPage = new ContactUsPage(this.page);
    }
    return this.contactUsPage;
  }

  /**
   * Provides an instance of ProductsPage. Creates the instance if it doesn't already exist.
   * @returns {ProductsPage} The ProductsPage object.
   */
  getProductsPage(): ProductsPage {
    if (!this.productsPage) {
      this.productsPage = new ProductsPage(this.page);
    }
    return this.productsPage;
  }

  /**
   * Provides an instance of ProductDetailsPage. Creates the instance if it doesn't already exist.
   * @returns {ProductDetailsPage} The ProductDetailsPage object.
   */
  getProductDetailsPage(): ProductDetailsPage {
    if (!this.productDetailsPage) {
      this.productDetailsPage = new ProductDetailsPage(this.page);
    }
    return this.productDetailsPage;
  }

  /**
   * Provides an instance of CartPage. Creates the instance if it doesn't already exist.
   * @returns {CartPage} The CartPage object.
   */
  getCartPage(): CartPage {
    if (!this.cartPage) {
      this.cartPage = new CartPage(this.page);
    }
    return this.cartPage;
  }

  /**
   * Returns the CheckoutPage object, creating it if it doesn't already exist.
   * * @returns {CheckoutPage} The CheckoutPage object.
   */
  getCheckoutPage(): CheckoutPage {
    if (!this.checkoutPage) {
      this.checkoutPage = new CheckoutPage(this.page);
    }
    return this.checkoutPage;
  }

  /**
   * Returns the CheckoutDialog object, creating it if it doesn't already exist.
   */
  getCheckoutDialog(): CheckoutDialog {
    if (!this.checkoutDialog) {
      this.checkoutDialog = new CheckoutDialog(this.page);
    }
    return this.checkoutDialog;
  }

  /**
   * Returns the ViewCartDialog object, creating it if it doesn't already exist.
   */
  getViewCartDialog(): ViewCartDialog {
    if (!this.viewCartDialog) {
      this.viewCartDialog = new ViewCartDialog(this.page);
    }
    return this.viewCartDialog;
  }
}
