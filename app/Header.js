'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ origins = [] }) {
  const [open, setOpen] = useState(false);

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
      </nav>
    </header>
  );
}
