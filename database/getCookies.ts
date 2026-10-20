import { cookies } from 'next/headers';
import type { Cart } from './cartType';

export default async function getCookies() {
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  return cart;
}
