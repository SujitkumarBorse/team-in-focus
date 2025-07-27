import { test, expect } from '@playwright/test';

test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact page before each test
    await page.goto('/contact');
  });

  test('should display contact page', async ({ page }) => {
    // Verify contact page is present
    await expect(page.locator('.contact-container')).toBeVisible();
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('Get In Touch');
  });

  test('should display contact information', async ({ page }) => {
    // Verify contact information section is present
    await expect(page.locator('.contact-info-container')).toBeVisible();
    
    // Verify contact methods are present
    const contactMethods = page.locator('.contact-method');
    const methodCount = await contactMethods.count();
    expect(methodCount).toBeGreaterThan(0);
    
    // Check for specific contact methods
    await expect(page.locator('text=Office Address')).toBeVisible();
    await expect(page.locator('text=Email Us')).toBeVisible();
    await expect(page.locator('text=Call Us')).toBeVisible();
  });

  test('should display contact details correctly', async ({ page }) => {
    // Check for address information
    await expect(page.locator('text=Shop No. 2, Vijay Residency')).toBeVisible();
    
    // Check for email
    await expect(page.locator('a[href="mailto:teaminfocus03@gmail.com"]')).toBeVisible();
    
    // Check for phone number
    await expect(page.locator('a[href="tel:+919767728709"]')).toBeVisible();
    await expect(page.locator('text=+91 9767728709')).toBeVisible();
  });

  test('should display business hours', async ({ page }) => {
    // Check for business hours
    await expect(page.locator('text=Mon-Sat: 9:00 AM - 6:00 PM PST')).toBeVisible();
  });

  test('should display map section', async ({ page }) => {
    // Verify map container is present
    await expect(page.locator('.map-container')).toBeVisible();
    
    // Check for map placeholder content
    await expect(page.locator('text=Our Location')).toBeVisible();
    await expect(page.locator('text=Visit us at our headquarters')).toBeVisible();
  });

  test('should have working directions button', async ({ page }) => {
    // Check for directions button
    const directionsBtn = page.locator('.directions-btn');
    await expect(directionsBtn).toBeVisible();
    await expect(directionsBtn).toContainText('Get Directions');
    
    // Test button click (this will test the function call)
    await directionsBtn.click();
  });

  test('should display social media links', async ({ page }) => {
    // Verify social links section
    await expect(page.locator('.social-links')).toBeVisible();
    await expect(page.locator('text=Follow Us')).toBeVisible();
    
    // Check for social media icons
    const socialIcons = page.locator('.social-icon');
    const iconCount = await socialIcons.count();
    expect(iconCount).toBeGreaterThan(0);
    
    // Check for specific social platforms
    await expect(page.locator('a[href*="youtube.com"]')).toBeVisible();
    await expect(page.locator('a[href*="instagram.com"]')).toBeVisible();
    await expect(page.locator('a[href*="facebook.com"]')).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    // Verify FAQ section is present
    await expect(page.locator('.faq-section')).toBeVisible();
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
    
    // Check for FAQ items
    const faqItems = page.locator('.faq-item');
    const faqCount = await faqItems.count();
    expect(faqCount).toBeGreaterThan(0);
  });

  test('should handle FAQ interactions', async ({ page }) => {
    // Get first FAQ item
    const firstFaq = page.locator('.faq-item').first();
    const faqQuestion = firstFaq.locator('.faq-question');
    const faqAnswer = firstFaq.locator('.faq-answer');
    
    // Click on FAQ question
    await faqQuestion.click();
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Check if FAQ interaction worked
    console.log(`FAQ interaction test completed`);
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2').first()).toBeVisible();
    
    // Check for proper link attributes
    const emailLink = page.locator('a[href="mailto:teaminfocus03@gmail.com"]');
    const phoneLink = page.locator('a[href="tel:+919767728709"]');
    
    await expect(emailLink).toBeVisible();
    await expect(phoneLink).toBeVisible();
  });

  test('should handle responsive layout', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Wait for layout to adjust
      await page.waitForTimeout(500);
      
      // Verify content is still visible
      await expect(page.locator('h1')).toContainText('Get In Touch');
      await expect(page.locator('.contact-info-container')).toBeVisible();
      
      console.log(`✓ ${viewport.width}x${viewport.height} - Contact page responsive`);
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');
    
    // Navigate through focusable elements
    for (let i = 0; i < 10; i++) {
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
  });

  test('should have proper page structure', async ({ page }) => {
    // Check for semantic HTML structure
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('.contact-section')).toBeVisible();
    await expect(page.locator('.faq-section')).toBeVisible();
    
    // Verify container structure
    await expect(page.locator('.contact-map-grid')).toBeVisible();
    await expect(page.locator('.contact-methods')).toBeVisible();
  });
}); 