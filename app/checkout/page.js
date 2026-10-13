import { cookies } from 'next/headers';
import { getProductInsecure } from '../../database/products';
import { checkout } from './actions';
import styles from './checkout.module.scss';

export const metadata = {
  title: 'Checkout',
  description:
    'Checkout page for filling out shipping information and payment details',
};

export default async function CheckoutPage() {
  const cart = JSON.parse((await cookies()).get('cart')?.value || '[]');
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
            type="text"
            required
            data-test-id="checkout-first-name"
            className="border border-gray-400 rounded px-2 py-1 bg-gray-50"
          />
        </label>
        <label>
          Last Name{' '}
          <input
            name="lastName"
            type="text"
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
            type="text"
            required
            data-test-id="checkout-address"
            className={styles.input}
          />
        </label>
        <label>
          City{' '}
          <input
            name="city"
            type="text"
            required
            data-test-id="checkout-city"
            className={styles.input}
          />
        </label>
        <label>
          Postal Code{' '}
          <input
            name="postalCode"
            type="text"
            required
            data-test-id="checkout-postal-code"
            className={styles.input}
          />
        </label>
        <label>
          Country{' '}
          <input
            name="country"
            type="text"
            required
            data-test-id="checkout-country"
            className={styles.input}
          />
        </label>
        <label>
          Credit Card{' '}
          <input
            name="creditCard"
            type="text"
            required
            data-test-id="checkout-credit-card"
            className={styles.input}
          />
        </label>
        <label>
          Expiration Date{' '}
          <input
            name="expirationDate"
            type="text"
            required
            data-test-id="checkout-expiration-date"
            className={styles.input}
          />
        </label>
        <label>
          Security Code{' '}
          <input
            name="securityCode"
            type="text"
            required
            data-test-id="checkout-security-code"
            className={styles.input}
          />
        </label>
        <label>
          Confirm Order
          <button
            data-test-id="checkout-confirm-order"
            className="bg-sky-300 w-15 border-2 border-sky-600 hover:bg-sky-800 hover:text-white"
          >
            ORDER
          </button>
        </label>
      </form>
    </div>
  );
}
