"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Browse products and add a few favorites.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Your cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-32 rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-slate-600">{formatCents(item.price)}</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-500" htmlFor={`qty-${item.productId}`}>
                Qty
              </label>
              <input
                id={`qty-${item.productId}`}
                type="number"
                min={1}
                value={item.qty}
                onChange={(event) => updateQty(item.productId, Number(event.target.value))}
                className="w-20 rounded-md border border-slate-200 px-2 py-1 text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-sm font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end gap-4">
        <p className="text-lg font-semibold">Total: {formatCents(total)}</p>
        <Link
          href="/checkout"
          className="inline-flex items-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
