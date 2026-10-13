import { cookies } from 'next/headers';
import Link from 'next/link';
import { Capitalize, getProductInsecure } from '../../database/products';
import { removeFromCart } from './actions';

export const metadata = {
  title: 'Your Cart',
  description: 'Cart page with all selected items',
};

export default async function CartPage() {
  const cart = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const items = await Promise.all(
    cart.map(async (item) => {
      const product = await getProductInsecure(item.id);
      return { ...product, quantity: item.quantity };
    }),
  );
  const totalBill = items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.price);
  }, 0);

  return (
    <div>
      <h1 className="text-4xl">Your cart</h1>
      <div className="flex flex-row pt-10 ml-10 mt-10">
        <div className="basis-2/3 border-black border-solid">
          <p className="text-2xl p-2">Your items</p>
          <ul>
            {items.map((item) => {
              return (
                <li
                  data-test-id={`cart-product-${item.id}`}
                  className="p-2"
                  key={item.id}
                >
                  {Capitalize(item.name)}:{' '}
                  <div data-test-id={`cart-product-quantity-${item.id}`}>
                    {item.quantity}
                  </div>{' '}
                  <div>
                    x {item.price}/{item.measure}
                  </div>
                  <div>{item.price * item.quantity}</div>
                  <form action={removeFromCart.bind(null, item.id)}>
                    <button
                      data-test-id={`cart-product-remove-${item.id}`}
                      className="text-red-500 hover:text-red-800 border-2 rounded-full bg-slate-500 p-1 w-8 border-solid border-slate-500 hover:bg-slate-700 hover:border-slate-700"
                    >
                      x
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="basis-1/3 flex flex-col">
          <div>Payment options</div>
          <Link href="/checkout">
            <button
              data-test-id="cart-checkout"
              className="bg-slate-600 hover:bg-slate-800 hover:text-white w-30 m-1"
            >
              Apple Pay
            </button>
          </Link>
          <Link href="/checkout">
            <button
              data-test-id="cart-checkout"
              className="bg-amber-300 hover:bg-amber-500 hover:text-white w-30 m-1"
            >
              MasterCard
            </button>
          </Link>
        </div>
      </div>
      <div data-test-id="cart-total">TOTAL:{totalBill.toFixed(2)}</div>
    </div>
  );
}
