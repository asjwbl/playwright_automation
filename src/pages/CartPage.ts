import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async verifyCartPageVisible() {
    await this.page.waitForSelector('li:has-text("Shopping Cart")');
  }

  async verifyProductQuantityInCart(expectedQuantity: string) {
    const quantity = await this.page.$eval('.cart_quantity button', el => el.textContent);
    expect(quantity).toBe(expectedQuantity);
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
