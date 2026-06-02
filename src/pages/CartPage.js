const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');

    
  }

  coffeeListItemLocator(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }

  coffeeListItemNameCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(0);
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(3);
  }

  async open() {
    await this.page.goto('/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('/cart');
  }

  async reload() {
    await this.page.reload();
  }


  async assertCoffeeNameContainsCorrectText(name) {
    await expect(this.coffeeListItemNameCell(name)).toContainText(name);
  }

 

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
  }


  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
  }


  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertCoffeeItemIsVisible(name) {
    await expect(this.coffeeListItemLocator(name)).toBeVisible();
  }

  async assertCoffeeItemIsHidden(name) {
    await expect(this.coffeeListItemLocator(name)).toBeHidden();
  }

  async clickRemoveCoffeeButton(coffeeName) {
    await this.coffeeListItemLocator(coffeeName)
      .getByRole('button', { name: `Remove one ${coffeeName}` })
      .click();
  }

  async clickAddOneCoffeeButton(coffeeName) {
    await this.coffeeListItemLocator(coffeeName)
      .getByRole('button', { name: `Add one ${coffeeName}` })
      .click();
  }

  async assertOtherCoffeeItemsAreVisible() {
    const coffeeItems = this.cartListLocator.getByRole('listitem');
    const count = await coffeeItems.count();

    for (let i = 0; i < count; i++) {
      await expect(coffeeItems.nth(i)).toBeVisible();
    }
  }




  async assertCoffeTotalCostContainsCorrectText(coffeeName, text) {
    await expect(this.coffeeListItemTotalCostCell(coffeeName)).toContainText(text);
  }


}
