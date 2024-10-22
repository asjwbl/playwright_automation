import { Page } from '@playwright/test';
import { BasicComponent } from '../components/basic_components/BasicComponent';
import path from 'path';

/**
 * FileUploadComponent class to handle file upload interactions.
 */
export class FileUploadComponent extends BasicComponent {
  constructor(page: Page, locator: string) {
    super(page, locator);
  }

  /**
   * Uploads a file by providing the file's relative path. The path is resolved to an absolute path.
   *
   * @param relativeFilePath - The relative path to the file to be uploaded.
   */
  async uploadFile(relativeFilePath: string): Promise<void> {
    // Resolve the relative file path to an absolute path
    const filePath = path.resolve(relativeFilePath);

    // Set the file input with the resolved file path
    await this.locator.setInputFiles(filePath);
  }

  /**
   * Clears the uploaded file, removing any selected files from the input.
   */
  async clearFile(): Promise<void> {
    await this.locator.setInputFiles([]); // Clears the file input
  }

  /**
   * Gets the name of the currently uploaded file.
   *
   * @returns The name of the uploaded file.
   */
  async getUploadedFileName(): Promise<string | null> {
    // Retrieve the value attribute of the file input field
    const uploadedFileName = await this.locator.evaluate(
      (input: HTMLInputElement) => input.files?.[0]?.name || null
    );
    return uploadedFileName;
  }
}
