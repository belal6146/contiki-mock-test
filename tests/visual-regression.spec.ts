
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('Homepage visual comparison', async ({ page }) => {
    await page.goto('/');
    
    // Wait for elements to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra time for animations
    
    // Take a screenshot and compare with baseline
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('homepage.png');
    
    console.log('Homepage visual test completed');
  });
  
  test('Tours listing page visual comparison', async ({ page }) => {
    await page.goto('/tours');
    
    // Wait for elements to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra time for animations
    
    // Take a screenshot and compare with baseline
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('tours-listing.png');
    
    console.log('Tours listing page visual test completed');
  });
  
  test('Tour detail page visual comparison', async ({ page }) => {
    await page.goto('/tours/european-discovery');
    
    // Wait for elements to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra time for animations
    
    // Take a screenshot and compare with baseline
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('tour-detail.png');
    
    console.log('Tour detail page visual test completed');
  });
  
  test('Responsive testing - mobile view', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Check homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const homeScreenshot = await page.screenshot();
    expect(homeScreenshot).toMatchSnapshot('homepage-mobile.png');
    
    // Check tour detail page
    await page.goto('/tours/european-discovery');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const detailScreenshot = await page.screenshot();
    expect(detailScreenshot).toMatchSnapshot('tour-detail-mobile.png');
    
    console.log('Mobile responsive tests completed');
  });
  
  test('Responsive testing - tablet view', async ({ page }) => {
    // Set viewport to tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const homeScreenshot = await page.screenshot();
    expect(homeScreenshot).toMatchSnapshot('homepage-tablet.png');
    
    // Check tour detail page
    await page.goto('/tours/european-discovery');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const detailScreenshot = await page.screenshot();
    expect(detailScreenshot).toMatchSnapshot('tour-detail-tablet.png');
    
    console.log('Tablet responsive tests completed');
  });
});
