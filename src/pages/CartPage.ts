import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

/**
 * Class to handle interactions and verifications on the shopping cart page.
 */
export class CartPage extends BasePage {

  /**
   * Verifies that the shopping cart page is visible by checking for the "Shopping Cart" text.
   */
  async verifyCartPageVisible() {
    // Waits for the "Shopping Cart" text to be visible in the cart page's list item.
    await this.page.waitForSelector('li:has-text("Shopping Cart")');
  }

  /**
   * Verifies the quantity of a product in the shopping cart.
   * @param expectedQuantity - The expected quantity of the product in the cart.
   */
  async verifyProductQuantityInCart(expectedQuantity: string) {
    // Retrieves the quantity text of the product in the cart and compares it with the expected value.
    const quantity = await this.page.$eval('.cart_quantity button', el => el.textContent);
    expect(quantity).toBe(expectedQuantity);
  }

  /**
   * Verifies the number of products in the cart.
   * @param productCounts - The expected number of products in the shopping cart.
   */
  async verifyProductsInCart(productCounts: number) {
    // Retrieves the list of products in the cart and ensures the number matches the expected count.
    const productRows = await this.page.$$('.cart_info .cart_description');
    expect(productRows.length).toBe(productCounts);
  }

  /**
   * Verifies the details of a specific product in the shopping cart by its index.
   * This includes checking the product's name, price, quantity, and total.
   * 
   * @param index - The index of the product in the cart (1-based index).
   * @param expectedDetails - An object containing the expected details of the product:
   *    - `name`: The expected name of the product.
   *    - `price`: The expected price of the product.
   *    - `quantity`: The expected quantity of the product.
   *    - `total`: The expected total price for the product.
   */
  async verifyProductDetailsInCart(index: number, expectedDetails: { name: string, price: string, quantity: string, total: string }) {
    // Retrieves and verifies the product name, price, quantity, and total cost for the product at the specified index.
    const name = await this.page.$eval(`#product-${index} h4`, el => el.textContent);
    const price = await this.page.$eval(`#product-${index} .cart_price p`, el => el.textContent);
    const quantity = await this.page.$eval(`#product-${index} .cart_quantity button`, el => el.textContent);
    const total = await this.page.$eval(`#product-${index} .cart_total_price`, el => el.textContent);

    // Verifies that the retrieved product details match the expected values.
    expect(name).toContain(expectedDetails.name);
    expect(price).toBe(expectedDetails.price);
    expect(quantity).toBe(expectedDetails.quantity);
    expect(total).toBe(expectedDetails.total);
  }
}

