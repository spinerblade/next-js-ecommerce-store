export const metadata = {
  title: 'Thank you for your order',
  description: 'Order is completed. Thank you for choosing our service',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-row justify-center items-center">
      <h1 className="bg-red-400 text-amber-500 hover:bg-emerald-700 hover:text-indigo-400 font-extrabold text-9xl p-20 w-300 h-120 flex justify-center items-center">
        THANK YOU FOR YOUR ORDER!
      </h1>
    </div>
  );
}
