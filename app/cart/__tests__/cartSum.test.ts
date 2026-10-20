import { describe, expect, jest, test } from '@jest/globals';
import { getProductInsecure } from '../../../database/products';
import cartSum from '../cartSum';

// Mock the database call so it doesn't crash
jest.mock('../../database/products');

describe('cartSum function', () => {
  test('sums up the prices in the cart', async () => {
    // Tell the mock what prices products 1 and 3 should have
    (getProductInsecure as jest.Mock).mockImplementation(async (id: number) => {
      if (id === 1) return { id: 1, price: 5 }; // 2 * 5 = 10
      if (id === 3) return { id: 3, price: 6 }; // 2 * 6 = 12
      return null;
    });

    const mockCart = [
      { id: 1, quantity: 2 },
      { id: 3, quantity: 2 },
    ];

    const result = await cartSum(mockCart);
    expect(result.totalBill).toBe(22); // 10 + 12 = 22
  });
});
