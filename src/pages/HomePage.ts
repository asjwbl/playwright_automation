import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async clickSignIn() {
    await this.page.click('a[href="/login"]');
  }

  async verifyHomePageLoaded() {
    await this.page.waitForSelector('h2:has-text("Full-Fledged practice website for Automation Engineers")');
  }

  async logout() {
    await this.page.click('a[href="/logout"]');
  }

  async clickContactUsLink() {
    await this.page.click('a[href="/contact_us"]')
  }

  async clickCart() {
    await this.page.click('a[href="/view_cart"]');
  }

  async clickTestCases() {
    await this.page.click('a[href="/test_cases"]');
  }

  async clickProducts() {
    await this.page.click('a[href="/products"]');
  }

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async verifySubscriptionText() {
    await this.page.waitForSelector('h2:has-text("Subscription")');
  }

  async enterSubscriptionEmail(email: string) {
    await this.page.fill('#susbscribe_email', email);
  }

  async clickSubscribeButton() {
    await this.page.click('#subscribe');
  }

  async verifySubscriptionSuccessMessage() {
    await this.page.waitForSelector('div:has-text("You have been successfully subscribed!")');
  }
}
