import { expect, test } from '../fixtures';

[
  {
    testName: 'by name ascending',
    sortOption: 'Name (A - Z)',
    sortFunction: (a: string, b: string) => a.localeCompare(b),
  },
  {
    testName: 'by name descending',
    sortOption: 'Name (Z - A)',
    sortFunction: (a: string, b: string) => b.localeCompare(a),
  },
].forEach((testData) => {
  test(`Verify user can perform sorting by ${testData.testName}`, async ({
    app,
  }) => {
    // 1. Open homepage and select sort option
    await app.homePage.goto();
    await app.homePage.sidebar.sortBy(testData.sortOption);

    // 3. Verify all the displayed products are sorted by names ascending or descending
    await expect(async () => {
      const actualProductNames = await app.homePage.getProductNames();
      const expectedProductNames = [...actualProductNames].sort(
        testData.sortFunction,
      );

      expect(actualProductNames).toEqual(expectedProductNames);
    }).toPass();
  });
});

[
  {
    testName: 'by price Low to High',
    sortOption: 'Price (Low - High)',
    sortFunction: (a: number, b: number) => a - b,
  },
  {
    testName: 'by price High to Low',
    sortOption: 'Price (High - Low)',
    sortFunction: (a: number, b: number) => b - a,
  },
].forEach((testData) => {
  test(`Verify user can perform sorting by ${testData.testName}`, async ({
    app,
  }) => {
    // 1. Open homepage and select sort option
    await app.homePage.goto();
    await app.homePage.sidebar.sortBy(testData.sortOption);

    // 2. Get an array of all product prices and sort it
    await expect(async () => {
      const actualProductPrices = await app.homePage.getProductPrices();
      const expectedProductPrices = [...actualProductPrices].sort(
        testData.sortFunction,
      );

      // 3. Verify all the displayed products are sorted by prices Low to High or High to Low.
      expect(actualProductPrices).toEqual(expectedProductPrices);
    }).toPass();
  });
});
