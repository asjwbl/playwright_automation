import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { InputComponent } from '../components/basic_components/Input';

/**
 * Class to handle the "All Products" page interactions, such as viewing and searching products.
 */
export class ProductsPage extends BasePage {
  private _searchInput!: InputComponent;
  private _searchButton!: ButtonComponent;

  // Getter for the search input field
  get searchInput(): InputComponent {
    return (this._searchInput ??= new InputComponent(
      this.page,
      'input[name="search"]'
    ));
  }

  // Getter for the search button
  get searchButton(): ButtonComponent {
    return (this._searchButton ??= new ButtonComponent(
      this.page,
      'button[id="submit_search"]'
    ));
  }

  /**
   * Verifies that the "All Products" page is visible.
   */
  async verifyAllProductsPageVisible(): Promise<void> {
    await this.page.waitForSelector('h2:has-text("All Products")');
  }

  /**
   * Verifies that the products list is visible.
   */
  async verifyProductsListVisible(): Promise<void> {
    await this.page.waitForSelector('.features_items');
  }

  /**
   * Clicks on the "View Product" button for the first product in the product listing.
   */
  async clickFirstProduct(): Promise<void> {
    await this.page.click("(//a[contains(text(),'View Product')])[1]");
  }

  /**
   * Searches for a product by name using the search input field.
   *
   * @param productName - The name of the product to search for.
   */
  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  /**
   * Verifies that the "Searched Products" section is visible on the search results page.
   */
  async verifySearchedProductsVisible(): Promise<void> {
    await this.page.waitForSelector('h2:has-text("Searched Products")');
  }

  /**
   * Verifies that the search results contain the searched product name.
   *
   * @param productName - The name of the product that was searched for.
   */
  async verifySearchResults(productName: string): Promise<void> {
    const productTitles = await this.page.$$eval('.productinfo p', (titles) =>
      titles.map((title) => title.textContent?.trim() || '')
    );
    for (const title of productTitles) {
      expect(title).toContain(productName);
    }
  }

  /**
   * Adds a product to the cart by hovering over the product and clicking the "Add to cart" button.
   *
   * @param index - The index of the product in the product list (1-based index).
   */
  async addProductToCart(index: number): Promise<void> {
    await this.page.hover(`(//div[@class='product-image-wrapper'])[${index}]`);
    await this.page.click(
      `(//div[@class='product-image-wrapper'])[${index}]//a[contains(text(), 'Add to cart')]`
    );
  }
}
