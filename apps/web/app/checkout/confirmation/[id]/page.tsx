import { ClearCartOnLoad } from "@/components/ClearCartOnLoad";
import { formatCents } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ConfirmationPage({
  params
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!order) {
    notFound();
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.qty,
    0
  );

  return (
    <div className="space-y-6">
      <ClearCartOnLoad />
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h1 className="text-2xl font-semibold text-emerald-900">
          Order confirmed
        </h1>
        <p className="mt-2 text-sm text-emerald-800">
          Thanks {order.customerName}! We received your order and will follow up soon.
        </p>
        <p className="mt-2 text-sm text-emerald-800">Order ID: {order.id}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p className="text-slate-500">Qty: {item.qty}</p>
              </div>
              <span>{formatCents(item.priceAtPurchase * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-slate-200 pt-4 text-base font-semibold">
          Total: {formatCents(total)}
        </div>
      </div>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
      >
        Continue shopping
      </Link>
    </div>
  );
}
