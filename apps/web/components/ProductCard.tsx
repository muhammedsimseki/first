import Link from "next/link";
import { formatCents } from "@/lib/money";

export type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export function ProductCard({ id, title, price, image }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{formatCents(price)}</p>
      </div>
    </Link>
  );
}
