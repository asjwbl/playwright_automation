import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { LabelComponent } from '../components/basic_components/Label';

/**
 * Class to handle interactions and verifications on the user account page.
 */
export class AccountPage extends BasePage {
  private loggedInLabelCached: LabelComponent | null = null;
  private deleteAccountButtonCached: ButtonComponent | null = null;
  private accountDeletedLabelCached: LabelComponent | null = null;

  /**
   * Getter for the "Logged in as [username]" label, cached for reuse.
   */
  get loggedInLabel(): LabelComponent {
    if (!this.loggedInLabelCached) {
      this.loggedInLabelCached = new LabelComponent(
        this.page,
        `a:has-text("Logged in as ")`
      );
    }
    return this.loggedInLabelCached;
  }

  /**
   * Getter for the "Delete Account" button, cached for reuse.
   */
  get deleteAccountButton(): ButtonComponent {
    if (!this.deleteAccountButtonCached) {
      this.deleteAccountButtonCached = new ButtonComponent(
        this.page,
        'a:has-text("Delete Account")'
      );
    }
    return this.deleteAccountButtonCached;
  }

  /**
   * Getter for the "Account Deleted!" label, cached for reuse.
   */
  get accountDeletedLabel(): LabelComponent {
    if (!this.accountDeletedLabelCached) {
      this.accountDeletedLabelCached = new LabelComponent(
        this.page,
        'h2:has-text("Account Deleted!")'
      );
    }
    return this.accountDeletedLabelCached;
  }

  /**
   * Verifies that the "Logged in as [username]" text is visible on the account page.
   *
   * @param username - The username of the logged-in user to verify.
   */
  async verifyLoggedInAsUsernameVisible(username: string): Promise<void> {
    // Creates a dynamic label for the specific username and waits for visibility
    const dynamicLoggedInLabel = new LabelComponent(
      this.page,
      `a:has-text("Logged in as ${username}")`
    );
    await dynamicLoggedInLabel.isVisible();
  }

  /**
   * Clicks the "Delete Account" button to initiate the account deletion process.
   */
  async clickDeleteAccountButton(): Promise<void> {
    await this.deleteAccountButton.click();
  }

  /**
   * Verifies that the "Account Deleted!" message is visible after successfully deleting the account.
   */
  async verifyAccountDeletedVisible(): Promise<void> {
    await this.accountDeletedLabel.isVisible();
  }
}
