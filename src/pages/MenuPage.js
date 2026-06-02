const { expect } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.coffeeMenuLocator = page.getByRole('list').nth(1);
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
  }

  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_')

    return this.page.getByTestId(testId);
  }

  async open() {
    await this.page.goto('/');
  }

  async clickCoffeeCup(coffeeName) {
    await this.coffeeCupLocator(coffeeName).click();
  }

  async clickCartLink() {
    await this.cartLink.click();
  }

  async clickYesPromoButton() {
    await this.yesPromoButton.click();
  }

  async clickNoPromoButton() {
    await this.noPromoButton.click();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }

  async assertCoffeeUnitContainsCorrectText(coffeeName, value) {
    const coffeeItem = this.coffeeMenuLocator
      .getByRole('listitem')
      .filter({ hasText: coffeeName })
      .filter({ hasText: value });

    await expect(coffeeItem).toContainText(value);
  }

  coffeeListItemLocator(name) {
    return this.coffeeMenuLocator.getByRole('listitem').filter({ hasText: name });
  }
}
