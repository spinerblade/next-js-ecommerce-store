import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Cart } from '../../../database/cartType';
import { Capitalize, getProductInsecure } from '../../../database/products';
import Quantity from './Quantity';

export async function generateMetadata(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;
  const product = await getProductInsecure(Number(productId));
  if (!product) {
    notFound();
  }

  return {
    title: `${Capitalize(product.name)} ${product.origin} `,
    description: 'Page of each individual product',
  };
}

export default async function ProductPage(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;
  const product = await getProductInsecure(Number(productId));
  if (!product) {
    notFound();
  }
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div>
      <h1>{Capitalize(product.name)}</h1>
      <Image
        data-test-id="product-image"
        className=""
        src={`/products/${product.id}.avif`}
        width={350}
        height={350}
        priority
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
