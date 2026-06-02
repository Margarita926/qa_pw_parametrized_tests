import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee }) => {
  test(`Check ${coffee} removed from Cart`, async ({
    menuPage,
    cartPage,
  }) => {
    
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.clickCartLink();
    await cartPage.waitForLoading();
    await cartPage.clickRemoveCoffeeButton(coffee);
    await cartPage.assertNoCoffeeMessageIsVisible();
    });
});


// test('Check Espresso removed from Cart after clicking remove', async ({
//   cartPage,
//   menuPage,
// }) => {
//   await menuPage.open();
//   await menuPage.clickEspressoCup();

//   await menuPage.clickCartLink();
//   await cartPage.waitForLoading();

//   await cartPage.clickRemoveAllEspressoButton();
//   await cartPage.assertNoCoffeeMessageIsVisible();
