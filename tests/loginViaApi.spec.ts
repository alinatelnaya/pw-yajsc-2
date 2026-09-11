import { expect, test } from '../fixtures';
import { customer } from '../test-data/customer';

test('Verify login via API', async ({ loggedInApp, page }) => {
  await loggedInApp.homePage.header.navigateToMyAccountViaUserMenu();
  await expect(page).toHaveURL(loggedInApp.accountPage.path);
  await expect(loggedInApp.accountPage.accountPageTitle).toHaveText(
    'My account',
  );
  await expect(loggedInApp.homePage.header.userMenuDropdown).toHaveText(
    customer.fullName,
  );
});
