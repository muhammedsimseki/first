import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Latest arrivals</h1>
        <p className="mt-2 text-slate-600">
          Browse our curated selection of essentials.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.images[0] ?? \"https://picsum.photos/seed/placeholder/800/600\"}
          />
        ))}
      </div>
    </section>
  );
}
