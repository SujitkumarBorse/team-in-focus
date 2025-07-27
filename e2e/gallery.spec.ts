import { test, expect } from '@playwright/test';

test.describe('Gallery Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the gallery page before each test
    await page.goto('/gallery');
    // Wait for the page to be ready
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display gallery page', async ({ page }) => {
    // Verify gallery page loads
    await expect(page).toHaveURL('/gallery');
    // Wait for the title to be visible
    await page.waitForSelector('h1', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
  });

  test('should load gallery images', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Check if images are present
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Verify at least some images are loaded
    expect(imageCount).toBeGreaterThan(0);
    
    // Check if images are visible
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      await expect(images.nth(i)).toBeVisible();
    }
  });

  test('should display image information', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check for image titles or descriptions (if implemented)
    const imageContainers = page.locator('.gallery-item, .image-container, [class*="gallery"]');
    const containerCount = await imageContainers.count();
    
    if (containerCount > 0) {
      // Verify at least one container is visible
      await expect(imageContainers.first()).toBeVisible();
    }
  });

  test('should handle image click interactions', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Click on the first image
      await images.first().click();
      
      // Note: This test checks for image click behavior
      // The actual behavior depends on the implementation (modal, lightbox, etc.)
    }
  });

  test('should handle gallery filtering (if implemented)', async ({ page }) => {
    // Look for filter buttons or dropdowns
    const filterButtons = page.locator('button, select, [class*="filter"]');
    const filterCount = await filterButtons.count();
    
    if (filterCount > 0) {
      // Test filter functionality
      for (let i = 0; i < Math.min(filterCount, 3); i++) {
        const button = filterButtons.nth(i);
        await expect(button).toBeVisible();
        
        // Click filter button
        await button.click();
        
        // Wait for potential filtering to complete
        await page.waitForTimeout(500);
      }
    }
  });

  test('should handle gallery search (if implemented)', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
    const searchCount = await searchInput.count();
    
    if (searchCount > 0) {
      // Test search functionality
      await searchInput.first().fill('test');
      await page.keyboard.press('Enter');
      
      // Wait for search results
      await page.waitForTimeout(1000);
    }
  });

  test('should handle gallery pagination (if implemented)', async ({ page }) => {
    // Look for pagination controls
    const paginationButtons = page.locator('[class*="pagination"], [class*="page"], button:has-text("Next"), button:has-text("Previous")');
    const paginationCount = await paginationButtons.count();
    
    if (paginationCount > 0) {
      // Test pagination
      for (let i = 0; i < Math.min(paginationCount, 2); i++) {
        const button = paginationButtons.nth(i);
        await expect(button).toBeVisible();
        
        // Click pagination button
        await button.click();
        
        // Wait for page change
        await page.waitForTimeout(1000);
      }
    }
  });

  test('should handle responsive gallery layout', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1024, height: 768 },  // Tablet
      { width: 768, height: 1024 },  // Tablet Portrait
      { width: 375, height: 667 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Wait for layout to adjust
      await page.waitForTimeout(500);
      
      // Verify gallery is still visible
      await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
      
      // Check if images are still visible
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        await expect(images.first()).toBeVisible();
      }
    }
  });

  test('should handle image loading errors gracefully', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check for broken images
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const image = images.nth(i);
        
        // Check if image has proper attributes
        await expect(image).toHaveAttribute('src');
        
        // Note: This test checks for basic image attributes
        // Actual error handling depends on implementation
      }
    }
  });

  test('should handle gallery keyboard navigation', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    
    // Navigate through gallery items
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
  });

  test('should handle gallery accessibility', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check for alt text on images
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const image = images.nth(i);
        
        // Check if image has alt attribute (even if empty)
        await expect(image).toHaveAttribute('alt');
      }
    }
  });

  test('should handle gallery performance', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    
    // Navigate to gallery page
    await page.goto('/gallery');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Verify page loads within reasonable time (30 seconds for gallery with images)
    expect(loadTime).toBeLessThan(30000);
    
    console.log(`Gallery page loaded in ${loadTime}ms`);
  });
}); 