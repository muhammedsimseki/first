import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "./actions";

const ADMIN_COOKIE = "shop-admin";

export default async function AdminPage() {
  const isAuthed = cookies().get(ADMIN_COOKIE)?.value === "true";
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="mt-1 text-sm text-slate-600">Manage products for the storefront.</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            Log out
          </button>
        </form>
      </div>
      <AdminDashboard products={products} />
    </div>
  );
}
