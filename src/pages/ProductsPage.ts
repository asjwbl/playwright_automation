import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  async verifyAllProductsPageVisible() {
    await this.page.waitForSelector('h2:has-text("All Products")');
  }

  async verifyProductsListVisible() {
    await this.page.waitForSelector('.features_items');
  }

  async clickFirstProduct() {
    await this.page.click('.features_items .product-image-wrapper:first-of-type a:has-text("View Product")');
  }

  async searchProduct(productName: string) {
    await this.page.fill('input[name="search"]', productName);
    await this.page.click('button[id="submit_search"]');
  }

  async verifySearchedProductsVisible() {
    await this.page.waitForSelector('h2:has-text("Searched Products")');
  }

  async verifySearchResults(productName: string) {
    const productTitles = await this.page.$$eval('.productinfo p', titles => titles.map(title => title.textContent));
    for (const title of productTitles) {
      expect(title).toContain(productName);
    }
  }

  async addProductToCart(index: number) {
    await this.page.hover(`(//div[@class='product-image-wrapper'])[${index}]`);
    await this.page.click(`(//div[@class='product-image-wrapper'])[${index}]//a[contains(text(), 'Add to cart')]`);
  }

  async clickContinueShoppingButton() {
    await this.page.click('button:has-text("Continue Shopping")');
  }

  async clickViewCartButton() {
    await this.page.click('a[href="/view_cart"]');
  }
}
