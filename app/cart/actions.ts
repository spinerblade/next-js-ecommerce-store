'use server';
import { cookies } from 'next/headers';

type Cart = { id: number; quantity: number };

export async function removeFromCart(productId: number) {
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const newCart = cart.filter((item) => item.id !== productId);
  (await cookies()).set('cart', JSON.stringify(newCart));
}
