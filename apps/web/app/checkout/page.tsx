"use client";

import { useFormState } from "react-dom";
import { useCart } from "@/components/CartProvider";
import { formatCents } from "@/lib/money";
import { createOrder, type CheckoutState } from "./actions";

const initialState: CheckoutState = {};

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [state, formAction] = useFormState(createOrder, initialState);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="mt-2 text-slate-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <form action={formAction} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        {state.error ? (
          <p className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-700">{state.error}</p>
        ) : null}
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              required
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={4}
              className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Place order
        </button>
      </form>
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="space-y-3 text-sm">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <span>
                {item.title} × {item.qty}
              </span>
              <span>{formatCents(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-4 text-base font-semibold">
          Total: {formatCents(total)}
        </div>
      </div>
    </div>
  );
}
