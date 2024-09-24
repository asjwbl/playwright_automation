import { BasePage } from './BasePage';

/**
 * Class to handle interactions and verifications on the user account page.
 */
export class AccountPage extends BasePage {

  /**
   * Verifies that the "Logged in as [username]" text is visible on the account page.
   * 
   * @param username - The username of the logged-in user to verify.
   */
  async verifyLoggedInAsUsernameVisible(username: string) {
    // Waits for the "Logged in as [username]" text to appear, confirming the user is logged in.
    await this.page.waitForSelector(`a:has-text("Logged in as ${username}")`);
  }

  /**
   * Clicks the "Delete Account" button to initiate the account deletion process.
   */
  async clickDeleteAccountButton() {
    // Clicks the "Delete Account" button to start the account deletion process.
    await this.page.click('a:has-text("Delete Account")');
  }

  /**
   * Verifies that the "Account Deleted!" message is visible after successfully deleting the account.
   */
  async verifyAccountDeletedVisible() {
    // Waits for the "Account Deleted!" message to appear, confirming the account was deleted.
    await this.page.waitForSelector('h2:has-text("Account Deleted!")');
  }
}

