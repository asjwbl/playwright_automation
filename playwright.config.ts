import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Set to false if you want to see the browser
    viewport: { width: 1920, height: 1080 }, // Set to your desired resolution
    baseURL: 'http://automationexercise.com',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    trace: 'on-first-retry', // Collect trace only on retries for debugging
  },
  testDir: './test',
  retries: 2, // to help identify flaky tests
  reporter: [['list'], ['html'], ['line']],
});
