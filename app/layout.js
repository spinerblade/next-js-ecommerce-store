import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { getProductsInsecure } from '../database/products';
import Footer from './Footer';
import Header from './Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  const products = await getProductsInsecure();
  const uniqueOrigins = [
    ...new Set(
      products.map((product) => {
        return product.origin;
      }),
    ),
  ];
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-taupe-200">
        <Header origins={uniqueOrigins} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
