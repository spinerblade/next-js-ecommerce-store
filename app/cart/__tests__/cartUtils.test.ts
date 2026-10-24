import { describe, expect, test } from '@jest/globals';
import {
  calculateCartSum,
  combineCartWithProducts,
  updateCartQuantity,
} from '../cartUtils';

const products = [
  {
    id: 1,
    name: 'durian',
    type: 'test',
    price: '6.99',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
  {
    id: 2,
    name: 'thai eggplant',
    type: 'test',
    price: '3.49',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
  {
    id: 3,
    name: 'dragon fruit',
    type: 'test',
    price: '4.29',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
  {
    id: 4,
    name: 'water spinach',
    type: 'test',
    price: '2.99',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
  {
    id: 5,
    name: 'carabao mango',
    type: 'test',
    price: '5.99',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
  {
    id: 6,
    name: 'bitter melon',
    type: 'test',
    price: '3.79',
    measure: 'test',
    origin: 'test',
    shortDescription: 'test',
    longDescription: 'test',
  },
];

const cart = [
  { id: 1, quantity: 4 },
  { id: 3, quantity: 2 },
];

describe('updateCartQuantity', () => {
  test('increases quantity of an existing item', () => {
    const additionalItem = { id: 1, quantity: 2 };
    const result = updateCartQuantity(
      cart,
      additionalItem.id,
      additionalItem.quantity,
    );
    expect(result).toEqual([
      { id: 1, quantity: 6 },
      { id: 3, quantity: 2 },
    ]);
  });
});

describe('combineCartWithProducts function', () => {
  test('combines cart quantities with product data', () => {
    const result = combineCartWithProducts(cart, products);
    expect(result).toEqual([
      {
        quantity: 4,
        id: 1,
        name: 'durian',
        type: 'test',
        price: '6.99',
        measure: 'test',
        origin: 'test',
        shortDescription: 'test',
        longDescription: 'test',
      },
      {
        quantity: 2,
        id: 3,
        name: 'dragon fruit',
        type: 'test',
        price: '4.29',
        measure: 'test',
        origin: 'test',
        shortDescription: 'test',
        longDescription: 'test',
      },
    ]);
  });
});

describe('calculateCartSum function', () => {
  test('sums up price times quantity of all items', () => {
    const items = [
      { price: '4.29', quantity: 3 },
      { price: '6.99', quantity: 6 },
    ];
    const result = calculateCartSum(items);
    expect(result).toBe(54.81);
  });
});
