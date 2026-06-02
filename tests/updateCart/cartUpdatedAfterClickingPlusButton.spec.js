import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Assert cart updated correctly after clicking plus for drinks`, async ({
    menuPage,
    cartPage,
  }) => {

  const oneCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const twoCappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
  const oneEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const twoEspressoPrice = priceFormatStr(COFFEE_PRICES.espresso * 2);
  const totalPriceNum =
    COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
  const totalPrice = priceFormatStr(totalPriceNum);

  const coffee1 = COFFEE_NAMES.espresso;
   const coffee2 = COFFEE_NAMES.cappuccino;

 
  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee2);
  await menuPage.clickCoffeeCup(coffee1);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee1, oneEspressoPrice);

  await cartPage.clickAddOneCoffeeButton(coffee1);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee1, twoEspressoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee2, oneCappuccinoPrice);
  

  await cartPage.clickAddOneCoffeeButton(coffee2);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee2, twoCappuccinoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee1, twoEspressoPrice);

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
  });
});