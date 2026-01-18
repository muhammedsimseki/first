"use client";

import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  productId: string;
  title: string;
  price: number;
  image: string;
  inventory: number;
};

export function AddToCartButton({
  productId,
  title,
  price,
  image,
  inventory
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const existing = items.find((item) => item.productId === productId);
  const remaining = inventory - (existing?.qty ?? 0);

  return (
    <button
      type="button"
      onClick={() => addItem({ productId, title, price, image })}
      disabled={remaining <= 0}
      className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {remaining <= 0 ? "Out of stock" : "Add to cart"}
    </button>
  );
}
