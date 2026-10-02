'use client';
import { useState } from 'react';

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="">
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
        data-test-id="product-quantity"
        className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
        onClick={() => {
          setQuantity(quantity - 1);
        }}
      >
        -
      </button>
      <p>Quantity: {quantity}</p>
    </div>
  );
}
