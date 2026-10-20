'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type HeaderProps = {
  origins: string[];
  cartTotal: number;
};
export default function Header({ origins = [], cartTotal = 0 }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className=" p-6 bg-mauve-800 text-teal-300">
      <nav className="flex justify-between">
        <Link data-test-id="products-link" href="/">
          Main Page
        </Link>
        <div>
          <button
            className="relative"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Categories
          </button>
          {open && (
            <div className="absolute flex flex-col gap-2 bg-mauve-800 p-4">
              {origins.map((origin) => {
                return (
                  <Link key={origin} href="/">
                    {origin}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-2 border-solid border-taupe-200 p-2 bg-taupe-200 hover:bg-white">
          <Link
            className="relative inline-block"
            data-test-id="cart-link"
            href="/cart"
          >
            <div>
              <Image
                src="/images/cart.svg"
                alt="cart symbol"
                width="60"
                height="60"
              />
            </div>{' '}
            <div
              className="absolute inset-0 flex items-center justify-center font-extrabold text-red-700"
              data-test-id="cart-count"
            >
              {cartTotal}
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
