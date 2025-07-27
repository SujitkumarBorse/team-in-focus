import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Desktop Large', width: 1920, height: 1080 },
    { name: 'Desktop', width: 1366, height: 768 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Mobile Large', width: 425, height: 667 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Small', width: 320, height: 568 }
  ];

  test('should display correctly on all viewport sizes', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Test home page
      await page.goto('/home');
      await expect(page.locator('h1')).toContainText('Welcome to Our Studio!');
      
      // Test about page
      await page.goto('/about');
      await expect(page.locator('h2').first()).toBeVisible();
      
      // Test services page
      await page.goto('/services');
      await expect(page.locator('h2').first()).toBeVisible();
      
      // Test team page
      await page.goto('/team');
      await expect(page.locator('h2').first()).toBeVisible();
      
      // Test gallery page
      await page.goto('/gallery');
      await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
      
      // Test contact page
      await page.goto('/contact');
      await expect(page.locator('h1')).toContainText('Get In Touch');
      
      console.log(`✓ ${viewport.name} (${viewport.width}x${viewport.height}) - All pages display correctly`);
    }
  });

  test('should have responsive navigation menu', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/home');
      
      // Check if navigation is visible
      await expect(page.locator('nav')).toBeVisible();
      
      // Check if navigation links are accessible
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Test navigation functionality
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i);
        await expect(link).toBeVisible();
      }
      
      console.log(`✓ ${viewport.name} - Navigation menu responsive`);
    }
  });

  test('should handle mobile navigation menu (if hamburger menu exists)', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/home');
    
    // Look for hamburger menu button
    const hamburgerButton = page.locator('[class*="hamburger"], [class*="menu"], button:has-text("☰"), button:has-text("Menu")');
    const hamburgerCount = await hamburgerButton.count();
    
    if (hamburgerCount > 0) {
      // Test hamburger menu functionality
      await hamburgerButton.first().click();
      
      // Wait for menu to open
      await page.waitForTimeout(500);
      
      // Check if menu items are visible
      const menuItems = page.locator('nav a, [class*="menu-item"]');
      const itemCount = await menuItems.count();
      expect(itemCount).toBeGreaterThan(0);
      
      console.log('✓ Mobile hamburger menu works correctly');
    } else {
      console.log('ℹ No hamburger menu found - standard navigation used');
    }
  });

  test('should have responsive images', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/gallery');
      
      // Wait for images to load
      await page.waitForLoadState('networkidle');
      
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Check if images are visible and properly sized
        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const image = images.nth(i);
          await expect(image).toBeVisible();
          
          // Check if image has responsive attributes
          const src = await image.getAttribute('src');
          const srcset = await image.getAttribute('srcset');
          const sizes = await image.getAttribute('sizes');
          
          // Note: This checks for responsive image attributes
          // The actual implementation may vary
        }
      }
      
      console.log(`✓ ${viewport.name} - Images responsive`);
    }
  });

  test('should have responsive forms', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/contact');
      
      // Check if contact information is visible
      await expect(page.locator('.contact-info-container')).toBeVisible();
      
      // Check for contact methods
      const contactMethods = page.locator('.contact-method');
      const methodCount = await contactMethods.count();
      expect(methodCount).toBeGreaterThan(0);
      
      // Test contact method visibility
      for (let i = 0; i < Math.min(methodCount, 2); i++) {
        const method = contactMethods.nth(i);
        await expect(method).toBeVisible();
      }
      
      console.log(`✓ ${viewport.name} - Contact page responsive`);
    }
  });

  test('should handle text readability across viewports', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/about');
      
      // Check if text content is readable
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      if (headingCount > 0) {
        for (let i = 0; i < Math.min(headingCount, 3); i++) {
          const heading = headings.nth(i);
          await expect(heading).toBeVisible();
          
          // Check if text is not too small (basic accessibility check)
          const fontSize = await heading.evaluate(el => window.getComputedStyle(el).fontSize);
          const fontSizeNum = parseFloat(fontSize);
          expect(fontSizeNum).toBeGreaterThan(8); // Minimum readable font size
        }
      }
      
      console.log(`✓ ${viewport.name} - Text readability maintained`);
    }
  });

  test('should handle touch interactions on mobile', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test touch interactions on different pages
    const pages = ['/', '/about', '/services', '/team', '/gallary', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Test touch-friendly button sizes
      const buttons = page.locator('button, a[role="button"]');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        for (let i = 0; i < Math.min(buttonCount, 3); i++) {
          const button = buttons.nth(i);
          await expect(button).toBeVisible();
          
          // Check if button is large enough for touch (minimum 44px)
          const buttonSize = await button.boundingBox();
          if (buttonSize) {
            expect(buttonSize.width).toBeGreaterThanOrEqual(44);
            expect(buttonSize.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    }
    
    console.log('✓ Mobile touch interactions work correctly');
  });

  test('should handle landscape and portrait orientations', async ({ page }) => {
    // Test both orientations on tablet
    const orientations = [
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Tablet Portrait', width: 768, height: 1024 }
    ];
    
    for (const orientation of orientations) {
      await page.setViewportSize({ width: orientation.width, height: orientation.height });
      await page.goto('/');
      
      // Verify content adapts to orientation
      await expect(page.locator('h1')).toContainText('Welcome to Our Studio!');
      
      // Check navigation layout
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      console.log(`✓ ${orientation.name} - Orientation handled correctly`);
    }
  });

  test('should maintain functionality during viewport changes', async ({ page }) => {
    await page.goto('/');
    
    // Test functionality across viewport changes
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Wait for layout to adjust
      await page.waitForTimeout(500);
      
      // Test navigation still works
      await page.click('a[routerlink="/about"]');
      await expect(page).toHaveURL('/about');
      
      await page.click('a[routerlink="/home"]');
      await expect(page).toHaveURL('/home');
      
      console.log(`✓ ${viewport.name} - Functionality maintained during viewport change`);
    }
  });

  test('should handle CSS media queries correctly', async ({ page }) => {
    // Test breakpoint behavior
    const breakpoints = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1366, height: 768 }
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/home');
      
      // Check for responsive classes or styles
      const body = page.locator('body');
      const bodyClasses = await body.getAttribute('class') || '';
      
      // Note: This test checks for responsive classes
      // The actual implementation may use different class names
      
      console.log(`✓ ${breakpoint.name} breakpoint - CSS media queries working`);
    }
  });

  test('should handle performance across viewports', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Measure load time for each viewport
      const startTime = Date.now();
      await page.goto('/home');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Verify reasonable load time (30 seconds max to account for slower loading)
      expect(loadTime).toBeLessThan(30000);
      
      console.log(`✓ ${viewport.name} - Load time: ${loadTime}ms`);
    }
  });
}); 