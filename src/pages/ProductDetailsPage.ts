import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { InputComponent } from '../components/basic_components/Input';

/**
 * Class to manage interactions on the product details page.
 */
export class ProductDetailsPage extends BasePage {
  private _addToCartButton!: ButtonComponent;
  private _viewCartButton!: ButtonComponent;
  private _quantityInput!: InputComponent;

  // Getter for "Add to Cart" button (cached)
  get addToCartButton(): ButtonComponent {
    return (this._addToCartButton ??= new ButtonComponent(
      this.page,
      'button:has-text("Add to cart")'
    ));
  }

  // Getter for "View Cart" button (cached)
  get viewCartButton(): ButtonComponent {
    return (this._viewCartButton ??= new ButtonComponent(
      this.page,
      'u:has-text("View Cart")'
    ));
  }

  // Getter for quantity input field (cached)
  get quantityInput(): InputComponent {
    return (this._quantityInput ??= new InputComponent(
      this.page,
      'input[name="quantity"]'
    ));
  }

  /**
   * Verifies that the product details page is displayed correctly.
   */
  async verifyProductDetailVisible() {
    await this.page.waitForSelector('.product-information');
  }

  /**
   * Sets the quantity of the product before adding it to the cart.
   *
   * @param quantity - The desired quantity of the product to add to the cart.
   */
  async setProductQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  /**
   * Adds the product to the cart by clicking the "Add to Cart" button.
   */
  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  /**
   * Clicks the "View Cart" button to navigate to the cart page after adding a product.
   */
  async clickViewCartButton() {
    await this.viewCartButton.click();
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
    const productName = await this.page.$eval(
      '.product-information h2',
      (el) => el.textContent
    );
    const category = await this.page.$eval(
      '.product-information p:has-text("Category:")',
      (el) => el.textContent
    );
    const price = await this.page.$eval(
      '.product-information span:has-text("Rs.")',
      (el) => el.textContent
    );
    const availability = await this.page.$eval(
      '.product-information p:has-text("Availability:")',
      (el) => el.textContent
    );
    const condition = await this.page.$eval(
      '.product-information p:has-text("Condition:")',
      (el) => el.textContent
    );
    const brand = await this.page.$eval(
      '.product-information p:has-text("Brand:")',
      (el) => el.textContent
    );

    return {
      productName,
      category,
      price,
      availability,
      condition,
      brand,
    };
  }
}
