import { test, expect } from '../fixtures';

test('Verify mocked products response renders 20 items on UI', async ({
  app,
  page,
}) => {
  await page.route('**/products*', async (route) => {
    const json = Array.from({ length: 20 }, (_, index) => ({
      id: `mocked-product-id${index + 1}`,
      name: `Mocked Product ${index + 1}`,
      description: 'This is a mocked product description.',
      price: 10 + index,
      is_location_offer: false,
      is_rental: false,
      co2_rating: 'D',
      in_stock: true,
      is_eco_friendly: false,
      product_image: {
        id: `img-mocked-id${index + 1}`,
        by_name: 'Test Name',
        by_url: 'https://example.com',
        source_name: 'Mocked Source',
        source_url: 'https://unsplash.com/photos/W8BNwvOvW4M',
        file_name: 'mock.png',
        title: 'Mocked Product Image',
      },
      category: {
        id: '01M26RSXHBCDBK2TW638AF6K8D',
        name: 'Pliers',
        slug: 'pliers',
      },
      brand: {
        id: '01M26RSX77MG03QT7R7XB8X3P5',
        name: 'ForgeFlex Tools',
      },
    }));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        current_page: 1,
        data: json,
        from: 1,
        last_page: 1,
        per_page: 20,
        to: 20,
        total: 20,
      }),
    });
  });
  // 1. Open home page and navigate to product details page
  await app.homePage.goto();
  const productCards = page.locator('.card');
  await expect(productCards).toHaveCount(20);
});
