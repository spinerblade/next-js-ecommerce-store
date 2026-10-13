'use server';
import { cookies } from 'next/headers';

export async function addToCart(productId, quantity) {
  const cart = JSON.parse((await cookies()).get('cart')?.value || '[]');

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  (await cookies()).set('cart', JSON.stringify(cart));
}
