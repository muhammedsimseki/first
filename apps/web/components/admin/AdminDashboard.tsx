"use client";

import { useFormState } from "react-dom";
import type { Product } from "@prisma/client";
import { formatCents } from "@/lib/money";
import {
  createProduct,
  deleteProduct,
  type AdminFormState,
  updateProduct
} from "@/app/admin/actions";

const initialState: AdminFormState = {};

function ProductRow({ product }: { product: Product }) {
  const [state, formAction] = useFormState(updateProduct, initialState);

  return (
    <form action={formAction} className="rounded-lg border border-slate-200 bg-white p-4">
      <input type="hidden" name="id" value={product.id} />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Title</label>
            <input
              name="title"
              defaultValue={product.title}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Description</label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-3 lg:w-64">
          <div>
            <label className="text-xs font-semibold text-slate-500">Price (USD)</label>
            <input
              name="price"
              defaultValue={(product.price / 100).toFixed(2)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Inventory</label>
            <input
              name="inventory"
              type="number"
              min={0}
              defaultValue={product.inventory}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Images (comma separated)</label>
            <input
              name="images"
              defaultValue={product.images.join(", ")}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
      {state.error ? (
        <p className="mt-3 text-sm text-rose-600">{state.error}</p>
      ) : null}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Current price: {formatCents(product.price)} | Inventory: {product.inventory}
        </span>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Save
          </button>
          <button
            type="submit"
            formAction={deleteProduct}
            className="rounded-md border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}

export function AdminDashboard({ products }: { products: Product[] }) {
  const [state, formAction] = useFormState(createProduct, initialState);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Add a product</h2>
        {state.error ? (
          <p className="mt-3 text-sm text-rose-600">{state.error}</p>
        ) : null}
        <form action={formAction} className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-500">Title</label>
            <input
              name="title"
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Price (USD)</label>
            <input
              name="price"
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Inventory</label>
            <input
              name="inventory"
              type="number"
              min={0}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Images (comma separated)</label>
            <input
              name="images"
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="text-xs font-semibold text-slate-500">Description</label>
            <textarea
              name="description"
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Create product
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Products</h2>
        {products.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
            No products yet. Add your first product above.
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
