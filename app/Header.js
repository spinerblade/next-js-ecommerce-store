import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between p-6 bg-mauve-800 text-teal-300">
      <Link href="/">
        <div className="">MyStore</div>
      </Link>
      <div className="">Category</div>
      <Link href="/about">
        <div>About Us</div>
      </Link>
    </header>
  );
}
