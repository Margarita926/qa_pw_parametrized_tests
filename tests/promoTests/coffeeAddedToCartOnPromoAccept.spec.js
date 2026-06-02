import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Assert discounted Mocha added to the Cart after promo accepting`, async ({
    menuPage,
    cartPage,
  }) => {
 

  const espressoPrice = priceFormatStr(COFFEE_PRICES.espresso);
  const discMochaPrice = priceFormatStr(COFFEE_PRICES.discountedMocha);
  const cappuccinoPrice = priceFormatStr(COFFEE_PRICES.cappuccino);
  const americanoPrice = priceFormatStr(COFFEE_PRICES.americano);

  const coffee1 = COFFEE_NAMES.espresso;
  const coffee2 = COFFEE_NAMES.cappuccino;
  const coffee3 = COFFEE_NAMES.americano;
   const discountedMocha = COFFEE_NAMES.mocha;


  await menuPage.open();
  await menuPage.clickCoffeeCup(coffee2);
  await menuPage.clickCoffeeCup(coffee1);
  await menuPage.clickCoffeeCup(coffee3);

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee1, espressoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(
    discountedMocha,
    discMochaPrice,
  );
  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee2, cappuccinoPrice);
  await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee3, americanoPrice);
});
});




// import { test } from '../_fixtures/fixtures';
// import { priceFormatStr } from '../../src/common/priceFormatters';
// import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

// let testParameters = [];

// for (const [key, value] of Object.entries(COFFEE_NAMES)) {
//   testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
// }

// testParameters.forEach(({ coffee, price }) => {
//   test(`Assert discounted Mocha added to the Cart after promo accepting`, async ({
//     menuPage,
//     cartPage,
//   }) => {
 
//   const coffee1 = COFFEE_NAMES.espresso;
//   const coffee2 = COFFEE_NAMES.cappuccino;
//   const coffee3 = COFFEE_NAMES.americano;
//   const discountedMocha = COFFEE_NAMES.mocha + ' ' + 'Promo';


//   await menuPage.open();
//   await menuPage.clickCoffeeCup(coffee2);
//   await menuPage.clickCoffeeCup(coffee1);
//   await menuPage.clickCoffeeCup(coffee3);

//   await menuPage.assertPromoMessageIsVisible();

//   await menuPage.clickYesPromoButton();

//   await menuPage.clickCartLink();
//   await cartPage.waitForLoading();

//   await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee1, coffee2, coffee3);
//   await cartPage.assertDiscountedMochaTotalCostContainsCorrectText(
//     discountedMocha,);
//   await cartPage.assertCappuccinoTotalCostContainsCorrectText(coffee2);
//   await cartPage.assertAmericanoTotalCostContainsCorrectText(coffee3);

// });
// });