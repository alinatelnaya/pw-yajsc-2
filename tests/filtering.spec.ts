import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PowerTools } from '../enums/categories.enum';

test('Verify user can filter products by category Sander', async ({ page }) => {
  const homePage = new HomePage(page);

  // 1. Open homepage and select category Sander from the sidebar.
  await homePage.goto();
  await homePage.sidebar.selectCategory(PowerTools.SANDER);

  // 2. Get an array of all product names and verify that each product name contains the word "Sander".
  await expect(async () => {
    const productNames = await homePage.getProductNames();

    productNames.forEach((name: string) => {
      expect(name).toContain(PowerTools.SANDER);
    });
  }).toPass();
});
