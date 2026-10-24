import type { Cart } from '../../database/cartType';
import getCookies from '../../database/getCookies';
import { getProductsInsecure } from '../../database/products';
import { calculateCartSum, combineCartWithProducts } from './cartUtils';

export default async function cartSum() {
  const cart: Cart[] = await getCookies();
  const products = await getProductsInsecure();
  const items = combineCartWithProducts(cart, products);
  const totalBill = calculateCartSum(items);

  return { totalBill, items };
}
