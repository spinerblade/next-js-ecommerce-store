import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-6 bg-mauve-800 text-teal-300">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-span-3">
          © Kevin Buchmann GmbH. All rights reserved.
          <br />
          <br />
          Austria, Hauptstrasse 45/1, 1110. Vienna
        </div>
        <div></div>
        <div className="flex flex-col gap-5">
          <Link href="/">MyStore</Link>
          <div>Categories</div>
        </div>
        <div className="flex flex-col justify-between ">
          <Link href="/about">About Us</Link>

          <div>Instagram</div>
          <div>Privacy</div>
          <div>Press</div>
          <div>Terms of Service</div>
        </div>
      </div>
    </footer>
  );
}
