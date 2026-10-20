import test, { expect } from '@playwright/test';

test('changes quantity', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test-id="product-3"]').click();
  await page
    .locator('[data-test-id="product-quantity"]')
    .filter({ hasText: '+' })
    .click({ clickCount: 3 });

  await page
    .locator('[data-test-id="product-quantity"]')
    .filter({ hasText: '-' })
    .click({ clickCount: 1 });

  await expect(page.locator('[data-test-id="quantity-display"]')).toContainText(
    '3',
  );
});

test('adds to cart', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test-id="product-4"]').click();
  await page
    .locator('[data-test-id="product-quantity"]')
    .filter({ hasText: '+' })
    .click({ clickCount: 5 });

  await page
    .locator('[data-test-id="product-quantity"]')
    .filter({ hasText: '-' })
    .click({ clickCount: 2 });

  await page.locator('[data-test-id="product-add-to-cart"]').click();

  await expect(page.locator('[data-test-id="cart-display"]')).toContainText(
    '4',
  );
});

test('removes from cart', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test-id="product-5"]').click();

  await page
    .locator('[data-test-id="product-quantity"]')
    .filter({ hasText: '+' })
    .click({ clickCount: 2 });

  await page.locator('[data-test-id="product-add-to-cart"]').click();
  await expect(page.locator('[data-test-id="cart-count"]')).toContainText('3');
  await page.goto('/cart');
  await page.locator('[data-test-id="cart-product-remove-5"]').click();

  await expect(page.locator('[data-test-id="cart-count"]')).toContainText('0');
});
