import { Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountPage } from './pages/AccountPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ProductsPage } from './pages/ProductPage';

export class PageObjectManager {
  private page: Page;
  private homePage!: HomePage;
  private signUpPage!: SignUpPage;
  private accountPage!: AccountPage;
  private contactUsPage!: ContactUsPage;
  private productsPage!: ProductsPage;


  constructor(page: Page) {
    this.page = page;
  }

  getHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }

  getSignUpPage(): SignUpPage {
    if (!this.signUpPage) {
      this.signUpPage = new SignUpPage(this.page);
    }
    return this.signUpPage;
  }

  getAccountPage(): AccountPage {
    if (!this.accountPage) {
      this.accountPage = new AccountPage(this.page);
    }
    return this.accountPage;
  }

  getContactUsPage(): ContactUsPage {
    if (!this.contactUsPage) {
      this.contactUsPage = new ContactUsPage(this.page);
    }
    return this.contactUsPage;
  }

  getProductsPage(): ProductsPage {
    if (!this.productsPage) {
      this.productsPage = new ProductsPage(this.page);
    }
    return this.productsPage;
  }
}
