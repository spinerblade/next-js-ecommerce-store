import Image from 'next/image';
import Link from 'next/link';
import { Capitalize, getProducts } from '../database/products';

export const metadata = {
  title: 'Home Page',
  description: 'Landing page of the store',
};

export default function HomePage() {
  const products = getProducts();

  return (
    <>
      <h1 className="text-4xl flex items-center justify-center">
        Welcome to my Ecommerce Store
      </h1>
      <div className="text-lg">Find the finest products in my store...</div>
      <ul>
        {products.map((product) => {
          return (
            <div key={product.id} className="flex flex-row p-10">
              <Link
                data-test-id={`product-${product.id}`}

                href={`/products/${product.id}`}
              >
                <li className="">{Capitalize(product.name)}</li>
                <Image
                  className=""
                  src={`/products/${product.id}.avif`}
                  width="350"
                  height="350"
                  alt={product.name}
                />
              </Link>
              <p>{product.shortDescription}</p>
            </div>
          );
        })}
      </ul>
    </>
  );
}
