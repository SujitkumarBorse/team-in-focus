import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/home');
  });

  test('should navigate to home page', async ({ page }) => {
    // Check if we're on the home page
    await expect(page).toHaveURL('/home');
    
    // Verify home page content is visible
    await expect(page.locator('h1')).toContainText('Welcome to Our Studio!');
  });

  test('should navigate to about page', async ({ page }) => {
    // Click on the about link
    await page.click('a[routerlink="/about"]');
    
    // Verify we're on the about page
    await expect(page).toHaveURL('/about');
    
    // Verify about page content (check for any h2 element)
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    // Click on the services link
    await page.click('a[routerlink="/services"]');
    
    // Verify we're on the services page
    await expect(page).toHaveURL('/services');
    
    // Verify services page content (check for any h2 element)
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should navigate to team page', async ({ page }) => {
    // Click on the team link
    await page.click('a[routerlink="/team"]');
    
    // Verify we're on the team page
    await expect(page).toHaveURL('/team');
    
    // Verify team page content (check for any h2 element)
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should navigate to gallery page', async ({ page }) => {
    // Click on the gallery link
    await page.click('a[routerlink="/gallery"]');
    
    // Verify we're on the gallery page
    await expect(page).toHaveURL('/gallery');
    
    // Verify gallery page content
    await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
  });

  test('should navigate to contact page', async ({ page }) => {
    // Click on the contact link
    await page.click('a[routerlink="/contact"]');
    
    // Verify we're on the contact page
    await expect(page).toHaveURL('/contact');
    
    // Verify contact page content
    await expect(page.locator('h1')).toContainText('Get In Touch');
  });

  test('should navigate back to home from other pages', async ({ page }) => {
    // Navigate to about page first
    await page.goto('/about');
    await expect(page).toHaveURL('/about');
    
    // Click on home link
    await page.click('a[routerlink="/home"]');
    
    // Verify we're back on home page
    await expect(page).toHaveURL('/home');
  });

  test('should have working navigation menu on all pages', async ({ page }) => {
    const pages = ['/home', '/about', '/services', '/team', '/gallery', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Verify navigation menu is present
      await expect(page.locator('nav')).toBeVisible();
      
      // Verify all navigation links are present
      await expect(page.locator('a[routerlink="/home"]')).toBeVisible();
      await expect(page.locator('a[routerlink="/about"]')).toBeVisible();
      await expect(page.locator('a[routerlink="/services"]')).toBeVisible();
      await expect(page.locator('a[routerlink="/team"]')).toBeVisible();
      await expect(page.locator('a[routerlink="/gallery"]')).toBeVisible();
      await expect(page.locator('a[routerlink="/contact"]')).toBeVisible();
    }
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Test direct navigation to each page
    const testCases = [
      { path: '/home', expectedTitle: 'Welcome to Our Studio!' },
      { path: '/about', expectedTitle: 'h2' },
      { path: '/services', expectedTitle: 'h2' },
      { path: '/team', expectedTitle: 'h2' },
      { path: '/gallery', expectedTitle: 'Our Photography Portfolio' },
      { path: '/contact', expectedTitle: 'Get In Touch' }
    ];

    for (const testCase of testCases) {
      await page.goto(testCase.path);
      await expect(page).toHaveURL(testCase.path);
      
      if (testCase.expectedTitle === 'h2') {
        await expect(page.locator('h2').first()).toBeVisible();
      } else if (testCase.expectedTitle === 'Our Photography Portfolio') {
        await expect(page.locator('h1')).toContainText(testCase.expectedTitle);
      } else {
        await expect(page.locator('h1')).toContainText(testCase.expectedTitle);
      }
    }
  });
}); 