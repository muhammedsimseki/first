"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function parseItems(raw: FormDataEntryValue | null) {
  if (!raw || typeof raw !== "string") {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((item) => item && typeof item.productId === "string")
      .map((item) => ({
        productId: String(item.productId),
        qty: Number(item.qty)
      }))
      .filter((item) => Number.isFinite(item.qty) && item.qty > 0);
  } catch (error) {
    console.error("Invalid cart payload", error);
    return [];
  }
}

export type CheckoutState = {
  error?: string;
};

export async function createOrder(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const items = parseItems(formData.get("items"));

  if (!name || !phone || !address) {
    return { error: "Please complete all customer fields." };
  }

  if (items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    return { error: "One or more products are unavailable." };
  }

  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      return { error: "Product no longer available." };
    }
    if (product.inventory < item.qty) {
      return { error: `Not enough inventory for ${product.title}.` };
    }
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        customerName: name,
        phone,
        address,
        items: {
          create: items.map((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            return {
              productId: item.productId,
              qty: item.qty,
              priceAtPurchase: product ? product.price : 0
            };
          })
        }
      }
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          inventory: { decrement: item.qty }
        }
      });
    }

    return created;
  });

  redirect(`/checkout/confirmation/${order.id}`);
}
