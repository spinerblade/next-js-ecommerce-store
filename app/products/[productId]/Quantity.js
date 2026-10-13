'use client';
import { useState } from 'react';
import { addToCart } from './actions';

export default function Quantity(props) {
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(props.cartQuantity);

  return (
    <div className="flex flex-row">
      <button
        data-test-id="product-quantity"
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setQuantity(Math.max(0, quantity - 1));
        }}
      >
        -
      </button>
      <span>Quantity: {quantity}</span>
      <button
        data-test-id="product-quantity"
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        +
      </button>
      <form>
        <button
          data-test-id="product-add-to-cart"
          className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
          formAction={async () => {
            await addToCart(props.productId, quantity);
            setCartQuantity(cartQuantity + quantity);
            setQuantity(1);
          }}
        >
          Add to Cart
        </button>
      </form>
      <span>
        You got {cartQuantity} {props.productName} in your cart
      </span>
    </div>
  );
}
