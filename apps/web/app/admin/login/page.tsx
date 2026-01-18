import { LoginForm } from "@/components/admin/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "shop-admin";

export default function AdminLoginPage() {
  const isAuthed = cookies().get(ADMIN_COOKIE)?.value === "true";
  if (isAuthed) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the admin password to manage products.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
