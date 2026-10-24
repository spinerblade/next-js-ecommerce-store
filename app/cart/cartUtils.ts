import type { Cart } from '../../database/cartType';
import type { Product } from '../../migrations/00000-createTableProducts';

export function updateCartQuantity(
  cart: Cart[],
  productId: number,
  quantity: number,
) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    return cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  return [...cart, { id: productId, quantity }];
}

export function combineCartWithProducts(cart: Cart[], products: Product[]) {
  return cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        return undefined;
      }
      return { ...product, quantity: item.quantity };
    })
    .filter((item) => item !== undefined);
}

export function calculateCartSum(
  items: {
    price: string | number;
    quantity: number;
  }[],
) {
  return items.reduce((sum, item) => {
    return sum + item.quantity * Number(item.price);
  }, 0);
}
