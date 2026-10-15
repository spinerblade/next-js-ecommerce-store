import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { getProductsInsecure } from '../database/products';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: ReactNode;
};

type Cart = {
  id: number;
  quantity: number;
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Props) {
  const products = await getProductsInsecure();
  const uniqueOrigins = [
    ...new Set(
      products.map((product) => {
        return product.origin;
      }),
    ),
  ];
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-taupe-200">
        <Header origins={uniqueOrigins} cartTotal={cartTotal} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
