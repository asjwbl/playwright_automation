import { BasePage } from './BasePage';

/**
 * Class to manage interactions on the product details page.
 */
export class ProductDetailsPage extends BasePage {
    /**
     * Verifies that the product details page is displayed correctly.
     */
  async verifyProductDetailVisible() {
    // Waits for the product information section to be visible.
    await this.page.waitForSelector('.product-information');
  }

  /**
     * Sets the quantity of the product before adding it to the cart.
     * @param quantity - The desired quantity of the product to add to the cart.
     */
  async setProductQuantity(quantity: number) {
    // Sets the input field value for the product quantity.
    await this.page.fill('input[name="quantity"]', quantity.toString());
  }

  /**
     * Adds the product to the cart by clicking the "Add to Cart" button.
     */
  async clickAddToCartButton() {
    // Clicks the "Add to cart" button to add the current product to the cart.
    await this.page.click('button:has-text("Add to cart")');
}

  /**
     * Clicks the "View Cart" button to navigate to the cart page after adding a product.
     */
  async clickViewCartButton() {
    // Clicks the "View Cart" button to proceed to the shopping cart page.
    await this.page.click('u:has-text("View Cart")');
}

 /**
 * Verifies and retrieves details of a product from the product details page.
 * 
 * @returns An object containing the product details, including:
 * - `productName`: The name of the product.
 * - `category`: The category to which the product belongs.
 * - `price`: The price of the product in Rs.
 * - `availability`: The availability status of the product.
 * - `condition`: The condition of the product (e.g., new or used).
 * - `brand`: The brand of the product.
 */
async verifyProductDetails() {
    // Retrieves the name of the product from the product information section.
    const productName = await this.page.$eval('.product-information h2', el => el.textContent);
    
    // Retrieves the category of the product.
    const category = await this.page.$eval('.product-information p:has-text("Category:")', el => el.textContent);
    
    // Retrieves the price of the product in Rs.
    const price = await this.page.$eval('.product-information span:has-text("Rs.")', el => el.textContent);
    
    // Retrieves the availability status of the product.
    const availability = await this.page.$eval('.product-information p:has-text("Availability:")', el => el.textContent);
    
    // Retrieves the condition of the product (e.g., new or used).
    const condition = await this.page.$eval('.product-information p:has-text("Condition:")', el => el.textContent);
    
    // Retrieves the brand of the product.
    const brand = await this.page.$eval('.product-information p:has-text("Brand:")', el => el.textContent);

    // Returns the collected product details as an object.
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
