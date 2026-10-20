import type { Cart } from '../../database/cartType';
import getCookies from '../../database/getCookies';
import { getProductInsecure } from '../../database/products';

export default async function cartSum(mockCart?: Cart[]) {
  const cart: Cart[] = mockCart ?? (await getCookies());
  const items = await Promise.all(
    cart.map(async (item) => {
      const product = await getProductInsecure(item.id);

      return { ...product, quantity: item.quantity };
    }),
  );
  const totalBill = items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.price);
  }, 0);

  return { totalBill, items };
}
