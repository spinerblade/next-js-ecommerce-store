import Image from 'next/image';
import { Capitalize } from '../../database/products';
import { removeFromCart } from './actions';
import cartSum from './cartSum';
import PaymentButtons from './PaymentButtons';

export const metadata = {
  title: 'Your Cart',
  description: 'Cart page with all selected items',
};

export default async function CartPage() {
  const { totalBill, items } = await cartSum();

  return (
    <div>
      <h1 className="text-4xl p-10">Your cart</h1>
      <div className="flex flex-row pt-10 ml-10 mt-10">
        <div className="basis-2/3 border-black border-solid">
          <ul>
            {items.map((item) => {
              const itemTotal = Number(item.price) * item.quantity;

              return (
                <li
                  data-test-id={`cart-product-${item.id}`}
                  className="p-2 m-2 border-2 border-mauve-700 w-150 bg-taupe-400"
                  key={item.id}
                >
                  {Capitalize(item.name)}
                  <Image
                    src={`/products/${item.id}.avif`}
                    alt={`Image of the product ${item.name}`}
                    width="200"
                    height="109"
                  />
                  <span>Quantity: </span>
                  <span data-test-id={`cart-product-quantity-${item.id}`}>
                    {item.quantity}
                  </span>
                  <div>
                    Price: {item.price}/{item.measure}
                  </div>
                  <div>Subtotal: {itemTotal.toFixed(2)}</div>
                  <form
                    className="flex justify-center"
                    action={removeFromCart.bind(null, item.id)}
                  >
                    <button
                      aria-label="remove-item-button"
                      data-test-id={`cart-product-remove-${item.id}`}
                      className=" text-black hover:text-white border-2 rounded-full bg-taupe-100 p-1 w-30 border-solid border-black hover:bg-black hover:border-black"
                    >
                      Remove Item from Cart
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="basis-1/3 flex flex-col justify-center border-2 p-2 m-2 border-mauve-700 w-150 bg-taupe-400">
          <div className="flex justify-center text-[24px]">Payment options</div>
          <PaymentButtons />
        </div>
      </div>
      <div className="text-[32px] flex flex-col p-20 bg-taupe-300">
        <span>TOTAL Price:</span>{' '}
        <span data-test-id="cart-total">{totalBill.toFixed(2)}</span>
      </div>
    </div>
  );
}
