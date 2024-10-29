import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { InputComponent } from '../components/basic_components/Input';
import { LabelComponent } from '../components/basic_components/Label';
import { ClickableComponent } from '../components/basic_components/Clickable';
import { LinkComponent } from '../components/basic_components/Link';

/**
 * Class to handle interactions with the homepage of AutomationExercise website.
 */
export class HomePage extends BasePage {
  private _signInButton: ButtonComponent | null = null;
  private _logoutButton: ButtonComponent | null = null;
  private _contactUsLink: ButtonComponent | null = null;
  private _cartButton: ButtonComponent | null = null;
  private _testCasesButton: ButtonComponent | null = null;
  private _productsButton: ButtonComponent | null = null;
  private _subscribeButton: ButtonComponent | null = null;
  private _subscriptionEmailInput: InputComponent | null = null;

  // Getter for SignIn Button (cached)
  get signInButton(): ButtonComponent {
    if (!this._signInButton) {
      this._signInButton = new ButtonComponent(this.page, 'a[href="/login"]');
    }
    return this._signInButton;
  }

  // Getter for Logout Button (cached)
  get logoutButton(): ButtonComponent {
    if (!this._logoutButton) {
      this._logoutButton = new ButtonComponent(this.page, 'a[href="/logout"]');
    }
    return this._logoutButton;
  }

  // Getter for Contact Us Link (cached)
  get contactUsLink(): ButtonComponent {
    if (!this._contactUsLink) {
      this._contactUsLink = new ButtonComponent(
        this.page,
        'a[href="/contact_us"]'
      );
    }
    return this._contactUsLink;
  }

  // Getter for Cart Button (cached)
  get cartButton(): ButtonComponent {
    if (!this._cartButton) {
      this._cartButton = new ButtonComponent(this.page, 'li:has-text("Cart")');
    }
    return this._cartButton;
  }

  // Getter for Test Cases Button (cached)
  get testCasesButton(): ButtonComponent {
    if (!this._testCasesButton) {
      this._testCasesButton = new ButtonComponent(
        this.page,
        "//a[contains(text(),'Test Cases')]"
      );
    }
    return this._testCasesButton;
  }

  // Getter for Products Button (cached)
  get productsButton(): ButtonComponent {
    if (!this._productsButton) {
      this._productsButton = ButtonComponent.byRole(this.page, 'link', {
        name: ' Products',
      });
    }
    return this._productsButton;
  }

  // Getter for Subscription Email Input (cached)
  get subscriptionEmailInput(): InputComponent {
    if (!this._subscriptionEmailInput) {
      this._subscriptionEmailInput = new InputComponent(
        this.page,
        '#susbscribe_email'
      );
    }
    return this._subscriptionEmailInput;
  }

  // Getter for Subscribe Button (cached)
  get subscribeButton(): ButtonComponent {
    if (!this._subscribeButton) {
      this._subscribeButton = new ButtonComponent(this.page, '#subscribe');
    }
    return this._subscribeButton;
  }

  /**
   * Clicks the "Sign In" button to navigate to the login page.
   */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /**
   * Verifies that the homepage has loaded successfully by checking for a specific element.
   */
  async verifyHomePageLoaded() {
    await this.page.waitForSelector(
      'h2:has-text("Full-Fledged practice website for Automation Engineers")'
    );
  }

  /**
   * Logs out the currently logged-in user by clicking the "Logout" link.
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Clicks the "Contact Us" link to navigate to the contact page.
   */
  async clickContactUsLink() {
    await this.contactUsLink.click();
  }

  /**
   * Clicks the "Cart" button to navigate to the shopping cart page.
   */
  async clickCart() {
    await this.cartButton.click();
  }

  /**
   * Clicks the "Test Cases" link to navigate to the test cases page.
   */
  async clickTestCases() {
    await this.testCasesButton.click();
  }

  /**
   * Clicks the "Products" link to navigate to the products page.
   */
  async clickProducts() {
    await this.productsButton.click();
  }

  /**
   * Scrolls down to the footer to interact with footer elements (like subscription).
   */
  async scrollToFooter() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }

  /**
   * Verifies that the "Subscription" text is visible on the page.
   */
  async verifySubscriptionText() {
    await this.page.waitForSelector('h2:has-text("Subscription")');
  }

  /**
   * Enters an email address in the subscription field located in the footer.
   * @param email - Email address to be subscribed to the newsletter.
   */
  async enterSubscriptionEmail(email: string) {
    await this.subscriptionEmailInput.fill(email);
  }

  /**
   * Clicks the subscription button to submit the email.
   */
  async clickSubscribeButton() {
    await this.subscribeButton.click();
  }

  /**
   * Verifies that the subscription was successful by checking for a confirmation message.
   */
  async verifySubscriptionSuccessMessage() {
    await this.page.waitForSelector(
      'div:has-text("You have been successfully subscribed!")'
    );
  }

  /**
   * Selects a main category, such as 'Women' or 'Men', from the categories sidebar.
   * @param category - The main category name to select.
   */
  async selectCategory(category: string): Promise<void> {
    const categoryLink = ClickableComponent.byRole(this.page, 'link', { name: category });
    await categoryLink.click();
  }

  /**
   * Selects a sub-category within a main category, such as 'Dress' under 'Women'.
   * @param subCategory - The sub-category name to select.
   */
  async selectSubCategory(subCategory: string): Promise<void> {
    const subCategoryLink = LinkComponent.byRole(this.page, 'link', { name: subCategory });
    await subCategoryLink.click();
  }

  /**
   * Verifies that the category page is displayed with the expected header text.
   * @param expectedText - The expected text to verify on the category page.
   */
  async verifyCategoryPageHeader(expectedText: string): Promise<void> {
    const headerLabel = new LabelComponent(this.page, `h2:has-text("${expectedText}")`);
    await headerLabel.isVisible();
  }
}
