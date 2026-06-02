import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Check ${coffee} has correct cost in menu`, async ({
    menuPage,
  }) => {
   
    const priceStr = priceFormatStr(price);

  
    await menuPage.open();
    await menuPage.assertCoffeeUnitContainsCorrectText(coffee, priceStr);


  });
});



//   for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  // // Тут тобі потрібно перетворити 'value' перед тим, як додати його в testParameters
  // const formattedCoffeeName = value.replace(/\s+/g, '_');
  // testParameters.push({ coffee: formattedCoffeeName, price: COFFEE_PRICES[key] });