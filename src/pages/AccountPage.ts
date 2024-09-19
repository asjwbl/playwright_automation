import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  
  async verifyLoggedInAsUsernameVisible(username: string) {
    await this.page.waitForSelector(`a:has-text("Logged in as ${username}")`);
  }

  async clickDeleteAccountButton() {
    await this.page.click('a:has-text("Delete Account")');
  }

  async verifyAccountDeletedVisible() {
    await this.page.waitForSelector('h2:has-text("Account Deleted!")');
  }
}
