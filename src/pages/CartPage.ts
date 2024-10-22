import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonComponent } from '../components/basic_components/Button';
import { LabelComponent } from '../components/basic_components/Label';

/**
 * Class to handle interactions and verifications on the shopping cart page.
 */
export class CartPage extends BasePage {
  private proceedToCheckoutButtonCached: ButtonComponent | null = null;

  /**
   * Getter for "Proceed to Checkout" button (cached for reuse).
   */
  get proceedToCheckoutButton(): ButtonComponent {
    if (!this.proceedToCheckoutButtonCached) {
      this.proceedToCheckoutButtonCached = new ButtonComponent(this.page, '.btn.btn-default.check_out');
    }
    return this.proceedToCheckoutButtonCached;
  }

  /**
   * Verifies that the shopping cart page is visible by checking for the "Shopping Cart" text.
   */
  async verifyCartPageVisible(): Promise<void> {
    const cartPageLabel = new LabelComponent(this.page, 'li:has-text("Shopping Cart")');
    await cartPageLabel.isVisible();
  }

  /**
   * Verifies the quantity of a product in the shopping cart.
   * @param expectedQuantity - The expected quantity of the product in the cart.
   */
  async verifyProductQuantityInCart(expectedQuantity: string): Promise<void> {
    const quantityLabel = new LabelComponent(this.page, '.cart_quantity button');
    const quantity = await quantityLabel.getText();
    expect(quantity).toBe(expectedQuantity);
  }

  /**
   * Verifies the number of products in the cart.
   * @param productCounts - The expected number of products in the shopping cart.
   */
  async verifyProductsInCart(productCounts: number): Promise<void> {
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
  async verifyProductDetailsInCart(
    index: number, 
    expectedDetails: { name: string, price: string, quantity: string, total: string }
  ): Promise<void> {
    const nameLabel = new LabelComponent(this.page, `#product-${index} h4`);
    const priceLabel = new LabelComponent(this.page, `#product-${index} .cart_price p`);
    const quantityLabel = new LabelComponent(this.page, `#product-${index} .cart_quantity button`);
    const totalLabel = new LabelComponent(this.page, `#product-${index} .cart_total_price`);

    const name = await nameLabel.getText();
    const price = await priceLabel.getText();
    const quantity = await quantityLabel.getText();
    const total = await totalLabel.getText();

    // Verifies that the retrieved product details match the expected values.
    expect(name).toContain(expectedDetails.name);
    expect(price).toBe(expectedDetails.price);
    expect(quantity).toBe(expectedDetails.quantity);
    expect(total).toBe(expectedDetails.total);
  }

  /**
   * Clicks the 'Proceed to Checkout' button on the Cart page.
   */
  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
