'use server';
import { cookies } from 'next/headers';
import type { Cart } from '../../../database/cartType';
import { updateCartQuantity } from '../../cart/cartUtils';

export async function addToCart(productId: number, quantity: number) {
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const newCart = updateCartQuantity(cart, productId, quantity);
  (await cookies()).set('cart', JSON.stringify(newCart));
}
