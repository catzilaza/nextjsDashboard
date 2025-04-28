import Link from "next/link";
// import { ThemeToggle } from '@/components/theme-toggle'

export default function Header() {
  return (
    <header className="bg-white py-4 px-8">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

{
  /* <header classNameName="py-4 px-8">
  <nav classNameName="container flex items-center justify-between">
    <ul classNameName="flex gap-6">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/blog">Posts</Link>
      </li>
    </ul>
  </nav>
</header>; */
}
