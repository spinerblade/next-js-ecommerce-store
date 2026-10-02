import Image from 'next/image';
import { Capitalize, getProducts } from '../../../database/products';
import Quantity from './Quantity';

export const metadata = {
  title: 'Single product page',
  description: 'Page of each individual product',
};

export default async function ProductPage(props) {
  const { productId } = await props.params;
  const products = getProducts();
  const singleProduct = products.find((product) => {
    return product.id === Number(productId);
  });

  return (
    <div>
      <h1>{Capitalize(singleProduct.name)}</h1>
      <Image
        data-test-id="product-image"
        className=""
        src={`/products/${singleProduct.id}.avif`}
        width="350"
        height="350"
        alt={singleProduct.name}
      />
      <Quantity />

      <p data-test-id="product-price">
        {singleProduct.price}/{singleProduct.measure}
      </p>
      <p>{singleProduct.origin}</p>
      <p>{singleProduct.longDescription}</p>
    </div>
  );
}
