import type { Locator, Page } from '@playwright/test';

export class SidebarFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly searchField: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchReset: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = this.page.getByTestId('sort');
    this.searchField = this.page.getByTestId('search-query');
    this.searchSubmitButton = this.page.getByTestId('search-submit');
    this.searchReset = this.page.getByTestId('search-reset');
  }

  // ==========================================
  // Private Helpers
  // ==========================================

  /**
   * Finds a checkbox locator by its exact label name.
   * @param name The visible label text of the checkbox.
   */
  private getCheckboxByName(name: string): Locator {
    return this.page.getByRole('checkbox', { name, exact: true });
  }

  // ==========================================
  // Sidebar Actions
  // ==========================================

  /**
   * Selects an ordering option in the sorting dropdown.
   * @param optionName Visible label of the sort option (e.g., 'Price (Low - High)').
   */
  async sortBy(optionName: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: optionName });
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.getCheckboxByName(categoryName).check();
  }
  /**
   * Checks one or multiple filter checkboxes by label name.
   * @param filterName Single filter name or array of filter names to select.
   */
  async checkFilter(filterName: string | string[]): Promise<void> {
    const names = Array.isArray(filterName) ? filterName : [filterName];
    for (const name of names) {
      await this.getCheckboxByName(name).check();
    }
  }

  /**
   * Unchecks one or multiple filter checkboxes by label name.
   * @param filterName Single filter name or array of filter names to deselect.
   */
  async uncheckFilter(filterName: string | string[]): Promise<void> {
    const names = Array.isArray(filterName) ? filterName : [filterName];
    for (const name of names) {
      await this.getCheckboxByName(name).uncheck();
    }
  }

  /**
   * Fills the search bar and clicks the search button.
   * @param searchText Query text to search for.
   */
  async searchFor(searchText: string): Promise<void> {
    await this.searchField.fill(searchText);
    await this.searchSubmitButton.click();
  }

  /**
   * Fills the search bar and submits the search by pressing the Enter key.
   * @param searchText Query text to search for.
   */
  async searchWithEnter(searchText: string): Promise<void> {
    await this.searchField.fill(searchText);
    await this.searchField.press('Enter');
  }

  /** Clears the search input and resets active search results. */
  async resetSearch(): Promise<void> {
    await this.searchReset.click();
  }

  // TODO: Implement price slider
}
