import { cookies } from 'next/headers';
import { getProductInsecure } from '../../database/products';
import { checkout } from './actions';
import styles from './checkout.module.scss';

type Cart = {
  id: number;
  quantity: number;
};

export const metadata = {
  title: 'Checkout',
  description:
    'Checkout page for filling out shipping information and payment details',
};

export default async function CheckoutPage() {
  const cart: Cart[] = JSON.parse((await cookies()).get('cart')?.value || '[]');
  const items = await Promise.all(
    cart.map(async (item) => {
      const product = await getProductInsecure(item.id);
      return { ...product, quantity: item.quantity };
    }),
  );
  const totalBill = items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.price);
  }, 0);

  return (
    <div>
      <h1>Your total bill: {totalBill.toFixed(2)}</h1>
      <form
        action={checkout}
        className="flex flex-col m-16 p-16 text-white bg-black"
      >
        <label>
          First Name
          <input
            name="firstName"

            required
            data-test-id="checkout-first-name"
            className="border border-gray-400 rounded px-2 py-1 bg-gray-50"
          />
        </label>
        <label>
          Last Name{' '}
          <input
            name="lastName"

            required
            data-test-id="checkout-last-name"
            className={styles.input}
          />
        </label>
        <label>
          Email{' '}
          <input
            name="email"
            type="email"
            required
            data-test-id="checkout-email"
            className={styles.input}
          />
        </label>
        <label>
          Address{' '}
          <input
            name="address"

            required
            data-test-id="checkout-address"
            className={styles.input}
          />
        </label>
        <label>
          City{' '}
          <input
            name="city"

            required
            data-test-id="checkout-city"
            className={styles.input}
          />
        </label>
        <label>
          Postal Code{' '}
          <input
            name="postalCode"

            required
            data-test-id="checkout-postal-code"
            className={styles.input}
          />
        </label>
        <label>
          Country{' '}
          <input
            name="country"

            required
            data-test-id="checkout-country"
            className={styles.input}
          />
        </label>
        <label>
          Credit Card{' '}
          <input
            name="creditCard"

            required
            data-test-id="checkout-credit-card"
            className={styles.input}
          />
        </label>
        <label>
          Expiration Date{' '}
          <input
            name="expirationDate"

            required
            data-test-id="checkout-expiration-date"
            className={styles.input}
          />
        </label>
        <label>
          Security Code{' '}
          <input
            name="securityCode"

            required
            data-test-id="checkout-security-code"
            className={styles.input}
          />
        </label>

        <button
          data-test-id="checkout-confirm-order"
          className="bg-sky-300 w-15 border-2 border-sky-600 hover:bg-sky-800 hover:text-white"
        >
          ORDER
        </button>
      </form>
    </div>
  );
}
