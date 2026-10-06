'use client';
import { useState } from 'react';

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(0);
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
      <button
        data-test-id="product-add-to-cart"
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setCart(cart + quantity);
        }}
      >
        Add to Cart
      </button>
      <span>Items in cart: {cart}</span>
    </div>
  );
}
