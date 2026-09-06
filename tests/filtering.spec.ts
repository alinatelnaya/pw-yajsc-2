import { test, expect } from '../fixtures';
import { PowerTools } from '../enums/categories.enum';

test('Verify user can filter products by category Sander', async ({ app }) => {
  // 1. Open homepage and select category Sander from the sidebar.
  await app.homePage.goto();
  await app.homePage.sidebar.selectCategory(PowerTools.SANDER);

  // 2. Get an array of all product names and verify that each product name contains the word "Sander".
  await expect(async () => {
    const productNames = await app.homePage.getProductNames();

    productNames.forEach((name: string) => {
      expect(name).toContain(PowerTools.SANDER);
    });
  }).toPass();
});
