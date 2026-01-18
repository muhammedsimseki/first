"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold">
          Shop MVP
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/cart" className="hover:text-slate-900">
            Cart ({count})
          </Link>
          <Link href="/admin" className="hover:text-slate-900">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
