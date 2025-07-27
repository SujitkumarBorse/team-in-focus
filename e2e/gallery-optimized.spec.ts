import { test, expect } from '@playwright/test';

test.describe('Gallery Tests (Optimized)', () => {
  test('should display gallery page with proper loading', async ({ page }) => {
    // Navigate to gallery page
    await page.goto('/gallery');
    
    // Wait for DOM content to load first
    await page.waitForLoadState('domcontentloaded');
    
    // Verify URL
    await expect(page).toHaveURL('/gallery');
    
    // Wait for the title to be visible with a reasonable timeout
    await page.waitForSelector('h1', { timeout: 15000 });
    
    // Verify the title content
    await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
  });

  test('should handle gallery loading states', async ({ page }) => {
    await page.goto('/gallery');
    
    // Wait for initial load
    await page.waitForLoadState('domcontentloaded');
    
    // Check for loading state if it exists
    const loadingElement = page.locator('.loading-container, .loading-spinner, [class*="loading"]');
    const hasLoading = await loadingElement.count() > 0;
    
    if (hasLoading) {
      // Wait for loading to complete
      await page.waitForSelector('.loading-container', { state: 'hidden', timeout: 20000 });
    }
    
    // Verify gallery content is visible
    await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
  });

  test('should display gallery tabs', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for gallery tabs to be visible
    await page.waitForSelector('.gallery-tabs', { timeout: 10000 });
    
    // Check for tab buttons
    const tabButtons = page.locator('.tab-button');
    const tabCount = await tabButtons.count();
    
    expect(tabCount).toBeGreaterThan(0);
    
    // Verify first tab is visible
    await expect(tabButtons.first()).toBeVisible();
  });

  test('should handle gallery tab switching', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for tabs to load
    await page.waitForSelector('.tab-button', { timeout: 10000 });
    
    const tabButtons = page.locator('.tab-button');
    const tabCount = await tabButtons.count();
    
    if (tabCount > 1) {
      // Click on second tab
      await tabButtons.nth(1).click();
      
      // Wait for tab switch
      await page.waitForTimeout(1000);
      
      // Verify tab is active
      await expect(tabButtons.nth(1)).toHaveClass(/active/);
    }
  });
}); 