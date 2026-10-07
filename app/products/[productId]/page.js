import { cookies } from 'next/headers';
import Image from 'next/image';
import { Capitalize, getProductInsecure } from '../../../database/products';
import Quantity from './Quantity';

export const metadata = {
  title: 'Single product page',
  description: 'Page of each individual product',
};

export default async function ProductPage(props) {
  const { productId } = await props.params;
  const product = await getProductInsecure(Number(productId));
  const cartQuantity = (await cookies()).get('cart')?.value || '';

  return (
    <div>
      <h1>{Capitalize(product.name)}</h1>
      <Image
        data-test-id="product-image"
        className=""
        src={`/products/${product.id}.avif`}
        width="350"
        height="350"
        alt={product.name}
      />
      <Quantity key={cartQuantity} cartQuantity={cartQuantity} />

      <p data-test-id="product-price">
        {product.price}/{product.measure}
      </p>
      <p>{product.origin}</p>
      <p>{product.longDescription}</p>
    </div>
  );
}
