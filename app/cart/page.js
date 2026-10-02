export default function CartPage() {
  return (
    <div>
      <h1 className="text-4xl">Your basket</h1>
      <div className="flex flex-row pt-10 ml-10 mt-10">
        <div className="basis-2/3 border-black border-solid">
          Your items
          <ul>
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
          </ul>
        </div>
        <div className="basis-1/3 flex flex-col">
          <div>Payment options</div>
          <button className="bg-slate-600">Apple Pay</button>
          <button className="bg-amber-300">MasterCard</button>
        </div>
      </div>
    </div>
  );
}
