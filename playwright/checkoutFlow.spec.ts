import test, { expect } from '@playwright/test';

test('puts items to cart then fills out checkout page and confirms order', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-test-id="product-1"]').click();

  await page.locator('[data-test-id="product-quantity"]').fill('6');

  await page.locator('[data-test-id="product-add-to-cart"]').click();

  await page.goBack();
  await page.locator('[data-test-id="product-2"]').click();

  await page.locator('[data-test-id="product-quantity"]').fill('3');

  await page.locator('[data-test-id="product-add-to-cart"]').click();

  await expect(page.locator('[data-test-id="cart-count"]')).toContainText('9');

  await page.locator('[data-test-id="cart-count"]').click();
  await page
    .locator('[data-test-id="cart-checkout"]')
    .filter({ hasText: 'Apple Pay' })
    .click();
  await expect(page.locator('h1')).toContainText('52.41');

  const customer = {
    firstName: 'Kevin',
    lastName: 'Buchmann',
    email: 'test@mail.com',
    address: 'Hauptstrasse 40/2',
    city: 'Vienna',
    postalCode: '3333',
    country: 'Austria',
    creditCard: '0123456789',
    expirationDate: '04/29',
    securityCode: '404',
  };
  await page
    .locator('[data-test-id="checkout-first-name"]')
    .fill(customer.firstName);
  await page
    .locator('[data-test-id="checkout-last-name"]')
    .fill(customer.lastName);
  await page.locator('[data-test-id="checkout-email"]').fill(customer.email);
  await page
    .locator('[data-test-id="checkout-address"]')
    .fill(customer.address);
  await page.locator('[data-test-id="checkout-city"]').fill(customer.city);
  await page
    .locator('[data-test-id="checkout-postal-code"]')
    .fill(customer.postalCode);
  await page
    .locator('[data-test-id="checkout-country"]')
    .fill(customer.country);
  await page
    .locator('[data-test-id="checkout-credit-card"]')
    .fill(customer.creditCard);
  await page
    .locator('[data-test-id="checkout-expiration-date"]')
    .fill(customer.expirationDate);
  await page
    .locator('[data-test-id="checkout-security-code"]')
    .fill(customer.securityCode);

  await page.locator('[data-test-id="checkout-confirm-order"]').click();
  await expect(page.locator('h1')).toContainText('Thank You', {
    ignoreCase: true,
  });
  await expect(page.locator('[data-test-id="cart-count"]')).toContainText('0');
});
