import { Page, Locator } from '@playwright/test';
import { BasicComponent } from '../components/basic_components/BasicComponent';

/**
 * TableComponent class to handle interactions with HTML tables.
 */
export class TableComponent extends BasicComponent {
    private headers: Locator;
    private rows: Locator;

    constructor(page: Page, tableLocator: string) {
        super(page, tableLocator);

        // Assuming the table has <thead> and <tbody>, we target those
        this.headers = this.locator.locator('thead tr th');
        this.rows = this.locator.locator('tbody tr');
    }

    /**
     * Gets the number of rows in the table (excluding headers).
     * 
     * @returns The number of rows in the table.
     */
    async getRowCount(): Promise<number> {
        return await this.rows.count();
    }

    /**
     * Gets the number of columns in the table based on header count.
     * 
     * @returns The number of columns in the table.
     */
    async getColumnCount(): Promise<number> {
        return await this.headers.count();
    }

    /**
     * Gets the text content of a specific cell based on row and column index.
     * 
     * @param rowIndex - The 1-based index of the row.
     * @param colIndex - The 1-based index of the column.
     * @returns The text content of the specified cell.
     */
    async getCellText(rowIndex: number, colIndex: number): Promise<string> {
        const cell = this.locator.locator(`tbody tr:nth-of-type(${rowIndex}) td:nth-of-type(${colIndex})`);
        return await cell.textContent() || '';
    }

    /**
     * Gets the text content of the table header for a given column.
     * 
     * @param colIndex - The 1-based index of the column.
     * @returns The text content of the header cell.
     */
    async getHeaderText(colIndex: number): Promise<string> {
        const header = this.headers.nth(colIndex - 1);
        return await header.textContent() || '';
    }

    /**
     * Finds a row by searching for a specific text in a particular column.
     * 
     * @param searchText - The text to search for.
     * @param colIndex - The 1-based index of the column to search in.
     * @returns The index of the matching row (1-based) or -1 if not found.
     */
    async findRowByText(searchText: string, colIndex: number): Promise<number> {
        const rowCount = await this.getRowCount();
        for (let i = 1; i <= rowCount; i++) {
            const cellText = await this.getCellText(i, colIndex);
            if (cellText.trim() === searchText.trim()) {
                return i;
            }
        }
        return -1; // Row not found
    }

    /**
     * Verifies that a table contains a specific value in a given row and column.
     * 
     * @param rowIndex - The 1-based index of the row.
     * @param colIndex - The 1-based index of the column.
     * @param expectedText - The expected text in the cell.
     */
    async verifyCellText(rowIndex: number, colIndex: number, expectedText: string): Promise<void> {
        const cellText = await this.getCellText(rowIndex, colIndex);
        if (cellText.trim() !== expectedText.trim()) {
            throw new Error(`Expected cell at row ${rowIndex}, col ${colIndex} to contain "${expectedText}", but got "${cellText}"`);
        }
    }

    /**
     * Clicks on a specific cell based on row and column index.
     * 
     * @param rowIndex - The 1-based index of the row.
     * @param colIndex - The 1-based index of the column.
     */
    async clickCell(rowIndex: number, colIndex: number): Promise<void> {
        const cell = this.locator.locator(`tbody tr:nth-of-type(${rowIndex}) td:nth-of-type(${colIndex})`);
        await cell.click();
    }

    /**
     * Gets the full text content of the entire table.
     * 
     * @returns A 2D array where each sub-array represents a row and contains the text content of each cell.
     */
    async getTableText(): Promise<string[][]> {
        const rowCount = await this.getRowCount();
        const colCount = await this.getColumnCount();
        const tableText: string[][] = [];

        for (let i = 1; i <= rowCount; i++) {
            const rowText: string[] = [];
            for (let j = 1; j <= colCount; j++) {
                rowText.push(await this.getCellText(i, j));
            }
            tableText.push(rowText);
        }

        return tableText;
    }
}
