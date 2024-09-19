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

  async verifyProductDetailVisible() {
    await this.page.waitForSelector('.product-information');
  }

  async verifyProductDetails() {
    const productName = await this.page.$eval('.product-information h2', el => el.textContent);
    const category = await this.page.$eval('.product-information p:has-text("Category:")', el => el.textContent);
    const price = await this.page.$eval('.product-information span:has-text("Rs.")', el => el.textContent);
    const availability = await this.page.$eval('.product-information p:has-text("Availability:")', el => el.textContent);
    const condition = await this.page.$eval('.product-information p:has-text("Condition:")', el => el.textContent);
    const brand = await this.page.$eval('.product-information p:has-text("Brand:")', el => el.textContent);

    return {
      productName,
      category,
      price,
      availability,
      condition,
      brand
    };
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

  async verifyProductsInCart(productCounts: number) {
    const productRows = await this.page.$$('.cart_info .cart_description');
    expect(productRows.length).toBe(productCounts);
  }

  async verifyProductDetailsInCart(index: number, expectedDetails: { name: string, price: string, quantity: string, total: string }) {
    const name = await this.page.$eval(`#product-${index} h4`, el => el.textContent);
    const price = await this.page.$eval(`#product-${index} .cart_price p`, el => el.textContent);
    const quantity = await this.page.$eval(`#product-${index} .cart_quantity button`, el => el.textContent);
    const total = await this.page.$eval(`#product-${index} .cart_total_price`, el => el.textContent);

    expect(name).toContain(expectedDetails.name);
    expect(price).toBe(expectedDetails.price);
    expect(quantity).toBe(expectedDetails.quantity);
    expect(total).toBe(expectedDetails.total);
  }
}
