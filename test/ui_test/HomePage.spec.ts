import { chromium, Browser, Page } from 'playwright';
import { HomePage } from '../../src/pages/HomePage';
import { test, expect } from '@playwright/test';
import { PageObjectManager } from '../../src/PageObjectManager';

let homePage: HomePage;



test('Verify homepage loads correctly', async () => {
  await homePage.navigate('https://automationexercise.com');
  await homePage.verifyHomePageLoaded();
});
