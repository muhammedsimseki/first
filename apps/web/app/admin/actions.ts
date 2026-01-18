"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type AdminFormState = {
  error?: string;
};

const ADMIN_COOKIE = "shop-admin";

function parseImages(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return [];
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parsePrice(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return null;
  }
  return Math.round(numeric * 100);
}

function parseInventory(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return null;
  }
  return Math.round(numeric);
}

function requireAdmin() {
  const isAuthed = cookies().get(ADMIN_COOKIE)?.value === "true";
  if (!isAuthed) {
    redirect("/admin/login");
  }
}

export async function loginAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const password = String(formData.get("password") ?? "").trim();
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    return { error: "ADMIN_PASSWORD is not configured." };
  }

  if (password !== expected) {
    return { error: "Invalid password." };
  }

  cookies().set(ADMIN_COOKIE, "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect("/admin");
}

export async function logoutAction() {
  cookies().set(ADMIN_COOKIE, "", {
    expires: new Date(0),
    path: "/"
  });
  redirect("/admin/login");
}

export async function createProduct(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = parsePrice(formData.get("price"));
  const images = parseImages(formData.get("images"));
  const inventory = parseInventory(formData.get("inventory"));

  if (
    !title ||
    !description ||
    price === null ||
    inventory === null ||
    images.length === 0
  ) {
    return { error: "All fields are required and must be valid." };
  }

  await prisma.product.create({
    data: {
      title,
      description,
      price,
      images,
      inventory
    }
  });

  revalidatePath("/admin");
  return {};
}

export async function updateProduct(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = parsePrice(formData.get("price"));
  const images = parseImages(formData.get("images"));
  const inventory = parseInventory(formData.get("inventory"));

  if (
    !id ||
    !title ||
    !description ||
    price === null ||
    inventory === null ||
    images.length === 0
  ) {
    return { error: "All fields are required and must be valid." };
  }

  await prisma.product.update({
    where: { id },
    data: {
      title,
      description,
      price,
      images,
      inventory
    }
  });

  revalidatePath("/admin");
  return {};
}

export async function deleteProduct(formData: FormData) {
  requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  await prisma.product.delete({
    where: { id }
  });

  revalidatePath("/admin");
}
