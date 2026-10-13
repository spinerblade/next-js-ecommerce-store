import { cookies } from 'next/headers';
import Image from 'next/image';
import { Capitalize, getProductInsecure } from '../../../database/products';
import Quantity from './Quantity';

export async function generateMetadata(props) {
  const { productId } = await props.params;
  const product = await getProductInsecure(Number(productId));

  return {
    title: `${Capitalize(product.name)} ${product.origin} `,
    description: 'Page of each individual product',
  };
}

export default async function ProductPage(props) {
  const { productId } = await props.params;
  const product = await getProductInsecure(Number(productId));
  const cart = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

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
      <Quantity
        productName={Capitalize(product.name)}
        productId={product.id}
        cartQuantity={cartQuantity}
      />

      <p data-test-id="product-price">
        {product.price}/{product.measure}
      </p>
      <p>{product.origin}</p>
      <p>{product.longDescription}</p>
    </div>
  );
}
