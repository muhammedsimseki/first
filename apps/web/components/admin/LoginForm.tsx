"use client";

import { useFormState } from "react-dom";
import { loginAction, type AdminFormState } from "@/app/admin/actions";

const initialState: AdminFormState = {};

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-700">{state.error}</p>
      ) : null}
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
      >
        Sign in
      </button>
    </form>
  );
}
