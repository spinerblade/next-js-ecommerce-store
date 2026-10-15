'use client';
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
          MyStore
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
        <Link href="/about">About Us</Link>
        <div className="border-2 border-solid border-white p-2 bg-white">
          <Link data-test-id="cart-link" href="/cart">
            <div>Cart</div> <div data-test-id="cart-count">({cartTotal})</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
