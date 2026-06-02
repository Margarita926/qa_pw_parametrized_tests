import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Assert discounted Mocha is hidden from the Cart after promo declining`, async ({
    menuPage,
    cartPage,
  }) => {
 
  const coffee1 = COFFEE_NAMES.espresso;
  const coffee2 = COFFEE_NAMES.cappuccino;
  const coffee3 = COFFEE_NAMES.americano;
  const discountedMocha = COFFEE_NAMES.mocha;


  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee2);
  await menuPage.clickCoffeeCup(coffee1);
  await menuPage.clickCoffeeCup(coffee3);

  await menuPage.assertPromoMessageIsVisible();
  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(coffee1);
  await cartPage.assertCoffeeItemIsHidden(discountedMocha);

  await cartPage.assertCoffeeItemIsVisible(coffee2);
  await cartPage.assertCoffeeItemIsVisible(coffee3);
});
});