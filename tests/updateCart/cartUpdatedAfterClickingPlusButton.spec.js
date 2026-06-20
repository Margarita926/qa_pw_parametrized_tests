import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Assert cart updated correctly after clicking plus for ${coffee} `, async ({
    menuPage,
    cartPage,
  }) => {

  const oneCoffeePrice = priceFormatStr(price);
  const twoCoffeePrice = priceFormatStr(price * 2);
  const totalPrice = twoCoffeePrice;

 
  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee, oneCoffeePrice);

  await cartPage.clickAddOneCoffeeButton(coffee);

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee, twoCoffeePrice);  

  await cartPage.assertTotalCheckoutContainsValue(totalPrice);
  });
});