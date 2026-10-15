'use client';
import { useRouter } from 'next/navigation';

export default function PaymentButtons() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          router.push('/checkout');
        }}
        data-test-id="cart-checkout"
        className="bg-slate-600 hover:bg-slate-800 hover:text-white w-30 m-1"
      >
        Apple Pay
      </button>

      <button
        onClick={() => {
          router.push('/checkout');
        }}
        data-test-id="cart-checkout"
        className="bg-amber-300 hover:bg-amber-500 hover:text-white w-30 m-1"
      >
        MasterCard
      </button>
    </>
  );
}
