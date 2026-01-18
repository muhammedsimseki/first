import { AddToCartButton } from "@/components/AddToCartButton";
import { formatCents } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductDetail({
  params
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-4">
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.images[0] ?? "https://picsum.photos/seed/placeholder/900/700"}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.images.slice(1).map((image) => (
            <div key={image} className="aspect-[4/3] overflow-hidden rounded-lg">
              <img src={image} alt={product.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500">In stock: {product.inventory}</p>
        <h1 className="mt-2 text-3xl font-semibold">{product.title}</h1>
        <p className="mt-4 text-lg font-medium text-slate-900">
          {formatCents(product.price)}
        </p>
        <p className="mt-6 text-slate-600">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          title={product.title}
          price={product.price}
          image={product.images[0] ?? "https://picsum.photos/seed/placeholder/900/700"}
          inventory={product.inventory}
        />
      </div>
    </div>
  );
}
