import { BasePage } from './BasePage';

/**
 * Class to handle interactions with the homepage of AutomationExercise website.
 */
export class HomePage extends BasePage {

  /**
     * Clicks the "Sign In" button to navigate to the login page.
     */
  async clickSignIn() {
    // Clicks the login link located on the navigation bar.
    await this.page.click('a[href="/login"]');
  }

  /**
     * Verifies that the homepage has loaded successfully by checking for a specific element.
     */
  async verifyHomePageLoaded() {
    // Waits for a specific header text to be visible on the homepage.
    await this.page.waitForSelector('h2:has-text("Full-Fledged practice website for Automation Engineers")');
  }

    /**
   * Logs out the currently logged-in user by clicking the "Logout" link.
   */
  async logout() {
    // Clicks the "Logout" link to log out the current user from the application.
    await this.page.click('a[href="/logout"]');
  }

  /**
   * Clicks the "Contact Us" link to navigate to the contact page.
   */
  async clickContactUsLink() {
    // Clicks the "Contact Us" link, navigating the user to the contact page.
    await this.page.click('a[href="/contact_us"]');
  }


  /**
     * Clicks the "Cart" button to navigate to the shopping cart page.
     */
  async clickCart() {
    // Clicks the cart link in the navigation menu.
    await this.page.click('a[href="/view_cart"]');
  }

    /**
   * Clicks the "Test Cases" link to navigate to the test cases page.
   */
  async clickTestCases() {
    // Clicks the "Test Cases" link, navigating the user to the test cases page.
    await this.page.click('a[href="/test_cases"]');
  }

  /**
   * Clicks the "Products" link to navigate to the products page.
   */
  async clickProducts() {
    // Clicks the "Products" link, navigating the user to the all products page.
    await this.page.click('a[href="/products"]');
  }


  /**
     * Scrolls down to the footer to interact with footer elements (like subscription).
     */
  async scrollToFooter() {
    // Scrolls the page to the bottom to reveal the footer.
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

    /**
   * Verifies that the "Subscription" text is visible on the page.
   */
  async verifySubscriptionText() {
    // Waits for the "Subscription" header to appear, ensuring that the subscription section is visible.
    await this.page.waitForSelector('h2:has-text("Subscription")');
  }

  /**
 * Enters an email address in the subscription field located in the footer.
 * @param email - Email address to be subscribed to the newsletter.
 */
async enterSubscriptionEmail(email: string) {
  // Fills the email input in the subscription form.
  await this.page.fill('#susbscribe_email', email);
}

  /**
 * Clicks the subscription button to submit the email.
 */
async clickSubscribeButton() {
  // Clicks the subscribe button in the footer section.
  await this.page.click('#subscribe');
}

  /**
 * Verifies that the subscription was successful by checking for a confirmation message.
 */
async verifySubscriptionSuccessMessage() {
  // Verifies the appearance of a success message for the subscription.
  await this.page.waitForSelector('div:has-text("You have been successfully subscribed!")');
}
}
