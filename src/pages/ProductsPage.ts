import { expect } from 'playwright/test';
import { BasePage } from './BasePage';

/**
 * Class to handle the "All Products" page interactions, such as viewing and searching products.
 */
export class ProductsPage extends BasePage {

  /**
     * Verifies that the "All Products" page is visible.
     */
  async verifyAllProductsPageVisible() {
    // Waits for the "All Products" header to be visible on the page.
    await this.page.waitForSelector('h2:has-text("All Products")');
  }

  /**
     * Verifies that the products list is visible.
     */
  async verifyProductsListVisible() {
    // Waits for the products list section to be visible on the page.
    await this.page.waitForSelector('.features_items');
  }

  /**
   * Clicks on the "View Product" button for the first product in the product listing.
   */
  async clickFirstProduct() {
    // Clicks the 'View Product' link for the first product in the product list.
    await this.page.click("(//a[contains(text(),'View Product')])[1]");
  }

  /**
   * Searches for a product by name using the search input field.
   * @param productName - The name of the product to search for.
   */
  async searchProduct(productName: string) {
    // Fills the search input field with the product name and submits the search.
    await this.page.fill('input[name="search"]', productName);
    await this.page.click('button[id="submit_search"]');
  }

  /**
   * Verifies that the "Searched Products" section is visible on the search results page.
   */
  async verifySearchedProductsVisible() {
    // Waits for the "Searched Products" header to be visible on the search results page.
    await this.page.waitForSelector('h2:has-text("Searched Products")');
  }

  /**
   * Verifies that the search results contain the searched product name.
   * @param productName - The name of the product that was searched for.
   */
  async verifySearchResults(productName: string) {
    // Retrieves the titles of all products in the search results and verifies that they contain the product name.
    const productTitles = await this.page.$$eval('.productinfo p', titles => titles.map(title => title.textContent));
    for (const title of productTitles) {
      expect(title).toContain(productName);
    }
  }

  /**
   * Adds a product to the cart by hovering over the product and clicking the "Add to cart" button.
   * @param index - The index of the product in the product list (1-based index).
   */
  async addProductToCart(index: number) {
    // Hovers over the product card at the given index and clicks the 'Add to cart' button.
    await this.page.hover(`(//div[@class='product-image-wrapper'])[${index}]`);
    await this.page.click(`(//div[@class='product-image-wrapper'])[${index}]//a[contains(text(), 'Add to cart')]`);
  }

  /**
   * Clicks the "Continue Shopping" button after adding a product to the cart.
   */
  async clickContinueShoppingButton() {
    // Clicks the 'Continue Shopping' button to return to the product listing after adding a product to the cart.
    await this.page.click('button:has-text("Continue Shopping")');
  }

  /**
   * Clicks the "View Cart" button to navigate to the cart page.
   */
  async clickViewCartButton() {
    // Clicks the 'View Cart' link in the navigation menu to navigate to the shopping cart page.
    await this.page.click('a[href="/view_cart"]');
  }
}
