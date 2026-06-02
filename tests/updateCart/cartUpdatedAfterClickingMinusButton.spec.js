import { test } from '../_fixtures/fixtures';

import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Assert cart updated correctly after clicking minus for drinks`, async ({
    menuPage,
    cartPage,
  }) => {

    const coffee1 = COFFEE_NAMES.espresso;
   const coffee2 = COFFEE_NAMES.cappuccino;
   

  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee1);
  await menuPage.clickCoffeeCup(coffee2);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(coffee1,coffee2);
  await cartPage.clickRemoveCoffeeButton(coffee1);

  await cartPage.assertCoffeeItemIsHidden(coffee1);
  await cartPage.assertOtherCoffeeItemsAreVisible(coffee2);

  await cartPage.clickRemoveCoffeeButton(coffee2);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
});