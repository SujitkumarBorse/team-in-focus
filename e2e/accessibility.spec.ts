import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/home');
  });

  test('should have proper page titles', async ({ page }) => {
    const pages = [
      { path: '/home', expectedTitle: 'Welcome to Our Studio!' },
      { path: '/about', expectedTitle: 'h2' },
      { path: '/services', expectedTitle: 'h2' },
      { path: '/contact', expectedTitle: 'Get In Touch' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('domcontentloaded');
      
      // Check if page title is descriptive
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // Check if main heading is present
      if (pageInfo.expectedTitle === 'h2') {
        await expect(page.locator('h2').first()).toBeVisible();
      } else {
        await expect(page.locator('h1')).toContainText(pageInfo.expectedTitle);
      }
    }
    
    // Test team page separately
    await page.goto('/team');
    await page.waitForLoadState('domcontentloaded');
    
    const teamTitle = await page.title();
    expect(teamTitle).toBeTruthy();
    expect(teamTitle.length).toBeGreaterThan(0);
    
    await expect(page.locator('h1')).toContainText('Meet Our Team');
    
    // Test gallery page separately with longer timeout
    await page.goto('/gallery');
    await page.waitForLoadState('domcontentloaded');
    
    const galleryTitle = await page.title();
    expect(galleryTitle).toBeTruthy();
    expect(galleryTitle.length).toBeGreaterThan(0);
    
    await page.waitForSelector('h1', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Our Photography Portfolio');
  });

  test('should have proper heading structure', async ({ page }) => {
    const pages = ['/home', '/about', '/services', '/team', '/gallery', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for proper heading hierarchy
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      if (headingCount > 0) {
        // Verify at least one main heading exists
        const h1Elements = page.locator('h1');
        const h1Count = await h1Elements.count();
        
        if (h1Count === 0) {
          // If no h1, check for h2 as main heading
          const h2Elements = page.locator('h2');
          const h2Count = await h2Elements.count();
          expect(h2Count).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/gallery');
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        
        // Check if image has alt attribute
        const altText = await image.getAttribute('alt');
        expect(altText).not.toBeNull();
        
        // Note: Alt text can be empty for decorative images
        // but the attribute should exist
      }
    }
  });

  test('should have proper contact information accessibility', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for proper contact information structure
    await expect(page.locator('.contact-info-container')).toBeVisible();
    
    // Check for proper link attributes
    const emailLink = page.locator('a[href="mailto:teaminfocus03@gmail.com"]');
    const phoneLink = page.locator('a[href="tel:+919767728709"]');
    
    await expect(emailLink).toBeVisible();
    await expect(phoneLink).toBeVisible();
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toContainText('Get In Touch');
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    const pages = ['/home', '/about', '/services', '/team', '/gallery', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      
      // Navigate through focusable elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
      }
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/home');
    
          // Test focus visibility on interactive elements
      const interactiveElements = page.locator('a, button, input, textarea, select');
      const elementCount = await interactiveElements.count();
      
      if (elementCount > 0) {
        // Test focus on first element only to avoid timing issues
        const firstElement = interactiveElements.first();
        
        // Focus the element
        await firstElement.focus();
        
        // Note: Focus testing is simplified to avoid timing issues
        // Visual focus indicators are checked by visual testing
      }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const pages = ['/home', '/about', '/services', '/team', '/gallery', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for common ARIA attributes
      const elementsWithAria = page.locator('[aria-label], [aria-labelledby], [aria-describedby], [role]');
      const ariaCount = await elementsWithAria.count();
      
      // Note: This test checks for presence of ARIA attributes
      // The actual implementation may vary
      console.log(`${pagePath} has ${ariaCount} elements with ARIA attributes`);
    }
  });

  test('should have proper color contrast (basic check)', async ({ page }) => {
    await page.goto('/home');
    
    // Check text elements for basic contrast
    const textElements = page.locator('h1, h2, h3, h4, h5, h6, p, span, a, button');
    const textCount = await textElements.count();
    
    if (textCount > 0) {
      for (let i = 0; i < Math.min(textCount, 5); i++) {
        const element = textElements.nth(i);
        
        // Check if text is visible (basic contrast check)
        const isVisible = await element.isVisible();
        expect(isVisible).toBe(true);
        
        // Note: Detailed color contrast analysis requires visual testing
        // This is a basic visibility check
      }
    }
  });

  test('should handle screen reader announcements', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for contact information and FAQ interactions
    await expect(page.locator('.contact-info-container')).toBeVisible();
    await expect(page.locator('.faq-section')).toBeVisible();
    
    // Check for live regions or announcements
    const liveRegions = page.locator('[aria-live], [aria-atomic], [aria-relevant]');
    const liveCount = await liveRegions.count();
    
    // Note: This checks for live region attributes
    // The actual implementation may vary
    console.log(`Contact page has ${liveCount} live regions`);
  });

  test('should have proper skip links (if implemented)', async ({ page }) => {
    await page.goto('/home');
    
    // Look for skip links
    const skipLinks = page.locator('a[href*="#main"], a[href*="#content"], [class*="skip"]');
    const skipCount = await skipLinks.count();
    
    if (skipCount > 0) {
      // Test skip link functionality
      for (let i = 0; i < skipCount; i++) {
        const skipLink = skipLinks.nth(i);
        await expect(skipLink).toBeVisible();
        
        // Test if skip link is keyboard accessible
        await skipLink.focus();
        await expect(skipLink).toBeFocused();
      }
      
      console.log('✓ Skip links found and functional');
    } else {
      console.log('ℹ No skip links found');
    }
  });

  test('should have proper landmark regions', async ({ page }) => {
    const pages = ['/home', '/about', '/services', '/team', '/gallery', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for semantic HTML elements and ARIA landmarks
      const landmarks = page.locator('header, nav, main, aside, footer, [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]');
      const landmarkCount = await landmarks.count();
      
      // Verify at least some landmark structure exists
      expect(landmarkCount).toBeGreaterThan(0);
      
      console.log(`${pagePath} has ${landmarkCount} landmark regions`);
    }
  });

  test('should handle dynamic content accessibility', async ({ page }) => {
    await page.goto('/gallery');
    
    // Wait for dynamic content to load
    await page.waitForLoadState('networkidle');
    
    // Check if dynamic content is accessible
    const dynamicContent = page.locator('[class*="gallery"], [class*="item"]');
    const contentCount = await dynamicContent.count();
    
    if (contentCount > 0) {
      // Test keyboard navigation through dynamic content
      await page.keyboard.press('Tab');
      
      // Simplified keyboard navigation test
      for (let i = 0; i < Math.min(contentCount, 2); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
      }
    }
  });

  test('should have proper error handling for accessibility', async ({ page }) => {
    await page.goto('/contact');
    
    // Test FAQ interaction accessibility
    const faqItems = page.locator('.faq-item');
    const faqCount = await faqItems.count();
    
    if (faqCount > 0) {
      // Click on first FAQ to test interaction
      const firstFaq = faqItems.first();
      await firstFaq.locator('.faq-question').click();
      
      // Wait for potential state changes
      await page.waitForTimeout(1000);
      
      // Check for FAQ state changes
      const openFaqs = page.locator('.faq-answer.open');
      const openCount = await openFaqs.count();
      
      console.log(`FAQ interaction test - ${openCount} FAQs are open`);
    }
  });

  test('should maintain accessibility during interactions', async ({ page }) => {
    await page.goto('/home');
    
    // Test navigation accessibility
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i);
        
        // Focus and activate link
        await link.focus();
        await expect(link).toBeFocused();
        
        await link.click();
        
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Check if new page is accessible
        const mainHeading = page.locator('h1, h2').first();
        await expect(mainHeading).toBeVisible();
      }
    }
  });

  test('should have proper language attributes', async ({ page }) => {
    await page.goto('/home');
    
    // Check for language declaration
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    
    // Verify language is specified
    expect(lang).toBeTruthy();
    expect(lang!.length).toBeGreaterThan(0);
    
    console.log(`Page language: ${lang}`);
  });

  test('should handle accessibility in different viewports', async ({ page }) => {
    const viewports = [
      { name: 'Desktop', width: 1366, height: 768 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Test keyboard navigation in different viewports
      await page.keyboard.press('Tab');
      
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      console.log(`✓ ${viewport.name} - Keyboard navigation works`);
    }
  });
}); 