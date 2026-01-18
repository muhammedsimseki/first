const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    title: "Canvas Backpack",
    description: "Durable canvas backpack with padded straps and roomy interior.",
    price: 6500,
    images: ["https://picsum.photos/seed/backpack/800/600"],
    inventory: 18
  },
  {
    title: "Ceramic Travel Mug",
    description: "Double-wall ceramic mug to keep drinks warm on the go.",
    price: 2400,
    images: ["https://picsum.photos/seed/mug/800/600"],
    inventory: 32
  },
  {
    title: "Minimal Desk Lamp",
    description: "Matte black desk lamp with adjustable neck.",
    price: 5200,
    images: ["https://picsum.photos/seed/lamp/800/600"],
    inventory: 12
  },
  {
    title: "Leather Notebook",
    description: "Refillable leather notebook with lined pages.",
    price: 1800,
    images: ["https://picsum.photos/seed/notebook/800/600"],
    inventory: 24
  },
  {
    title: "Stoneware Bowl Set",
    description: "Set of two stoneware bowls with speckled glaze.",
    price: 3600,
    images: ["https://picsum.photos/seed/bowls/800/600"],
    inventory: 14
  },
  {
    title: "Linen Throw Blanket",
    description: "Soft linen throw with tasseled edges.",
    price: 7800,
    images: ["https://picsum.photos/seed/blanket/800/600"],
    inventory: 9
  },
  {
    title: "Wooden Serving Board",
    description: "Hand-finished serving board made from walnut.",
    price: 4300,
    images: ["https://picsum.photos/seed/board/800/600"],
    inventory: 20
  },
  {
    title: "Aroma Candle",
    description: "Soy wax candle with cedar and citrus notes.",
    price: 2200,
    images: ["https://picsum.photos/seed/candle/800/600"],
    inventory: 30
  },
  {
    title: "Wool Beanie",
    description: "Cozy knit beanie made from merino wool.",
    price: 2600,
    images: ["https://picsum.photos/seed/beanie/800/600"],
    inventory: 26
  },
  {
    title: "Glass Water Bottle",
    description: "Reusable glass bottle with silicone sleeve.",
    price: 2100,
    images: ["https://picsum.photos/seed/bottle/800/600"],
    inventory: 28
  }
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
