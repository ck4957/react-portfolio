import { test, expect } from '@playwright/test';

test('has title and loads correctly', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Chirag Kular/);

  // Check that the header loads
  await expect(page.locator('header')).toBeVisible();

  // Check typing animation works
  await expect(page.locator('.title-styles')).toBeVisible();
});

test('responsive design works on mobile', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Check that header is visible on mobile
  await expect(page.locator('header')).toBeVisible();

  // Check that profile image is visible
  await expect(page.locator('img[alt="Avatar placeholder"]')).toBeVisible();
});

test('dark/light theme toggle works', async ({ page }) => {
  await page.goto('/');

  // Find and click the theme toggle
  const themeToggle = page.locator('#icon-switch');
  await expect(themeToggle).toBeVisible();
  
  await themeToggle.click();
  
  // Check if theme changed (data attribute should change)
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
});