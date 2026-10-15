import Image from 'next/image';
import Link from 'next/link';
import { Capitalize, getProductsInsecure } from '../database/products';

export const metadata = {
  title: 'Home Page',
  description: 'Landing page of the store',
};

export default async function ProductsPage() {
  const products = await getProductsInsecure();

  return (
    <>
      <h1 className="text-4xl flex items-center justify-center">
        Welcome to my E-commerce Store
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
