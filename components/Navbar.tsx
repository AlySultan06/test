import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav">
      <Link href="/">
        <strong>Positfy</strong>
      </Link>
      <nav className="nav-links">
        <Link href="/posters">Posters</Link>
        <Link href="/agent">AI Agent</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login" className="nav-cta">
          Sign in
        </Link>
      </nav>
    </header>
  );
}
