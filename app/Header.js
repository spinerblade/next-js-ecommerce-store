'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getProducts } from '../database/products';

export default function Header() {
  const [open, setOpen] = useState(false);
  const products = getProducts();
  const uniqueOrigins = [
    ...new Set(
      products.map((product) => {
        return product.origin;
      }),
    ),
  ];
  return (
    <header className=" p-6 bg-mauve-800 text-teal-300">
      <nav className="flex justify-between">
        <Link href="/">MyStore</Link>
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
              {uniqueOrigins.map((origin) => {
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
      </nav>
    </header>
  );
}
