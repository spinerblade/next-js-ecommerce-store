'use client';
import { useState } from 'react';
import { addToCart } from './actions';

type Props = {
  cartQuantity: number;
  productId: number;
  productName: string;
};

export default function Quantity(props: Props) {
  const [quantity, setQuantity] = useState('1');
  const [cartQuantity, setCartQuantity] = useState(props.cartQuantity);
  const quantityNumber = Math.max(1, Number(quantity));
  return (
    <div className="flex flex-row">
      <button
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setQuantity(String(Math.max(1, quantityNumber - 1)));
        }}
      >
        -
      </button>
      <span data-test-id="quantity-display">Quantity: {quantity}</span>
      <button
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setQuantity(String(quantityNumber + 1));
        }}
      >
        +
      </button>
      <form>
        <label>
          Choose Quantity
          <input
            className="bg-[#f9fafb] w-10 m-2"
            data-test-id="product-quantity"
            name="quantity"
            type="number"
            value={quantity}
            min="1"
            step="1"
            onChange={(event) => {
              const value = event.target.value;
              setQuantity(value !== '' && Number(value) < 1 ? '1' : value);
            }}
            onBlur={() => {
              setQuantity(String(quantityNumber));
            }}
          />
        </label>
        <button
          data-test-id="product-add-to-cart"
          className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
          formAction={async () => {
            await addToCart(props.productId, quantityNumber);
            setCartQuantity(cartQuantity + quantityNumber);
            setQuantity('1');
          }}
        >
          Add to Cart
        </button>
      </form>
      <span data-test-id="cart-display">
        You got {cartQuantity} {props.productName} in your cart
      </span>
    </div>
  );
}
