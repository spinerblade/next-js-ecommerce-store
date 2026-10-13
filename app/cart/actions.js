'use server';
import { cookies } from 'next/headers';

export async function removeFromCart(productId) {
  const cart = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const newCart = cart.filter((item) => item.id !== productId);
  (await cookies()).set('cart', JSON.stringify(newCart));
}
