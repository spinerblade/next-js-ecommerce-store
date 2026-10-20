'use server';
import { cookies } from 'next/headers';
import type { Cart } from '../../../database/cartType';

export async function addToCart(productId: number, quantity: number) {
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  (await cookies()).set('cart', JSON.stringify(cart));
}
