import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  async verifyProductDetailVisible() {
    await this.page.waitForSelector('.product-information');
  }

  async setProductQuantity(quantity: number) {
    await this.page.fill('input[name="quantity"]', quantity.toString());
  }

  async clickAddToCartButton() {
    await this.page.click('button:has-text("Add to cart")');
  }

  async clickViewCartButton() {
    await this.page.click('u:has-text("View Cart")');
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
}
