'use client';
import { useState } from 'react';
import { createCookie } from './actions';

export default function CookieForm(props) {
  const [cartQuantity, setCartQuantity] = useState(props.cartQuantity);
  return (
    <div>
      <form>
        <button
          data-test-id="product-add-to-cart"
          className="bg-indigo-950 text-white m-5 px-10 py-2 rounded-lg"
          formAction={async () => {
            setCartQuantity((currentCart) => currentCart + cartQuantity);
            await createCookie(cartQuantity);
          }}
        >
          Add to Cart
        </button>
      </form>
      <span>Items in cart: {cartQuantity}</span>
    </div>
  );
}
