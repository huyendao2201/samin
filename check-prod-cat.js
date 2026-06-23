const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const cats = await prisma.productCategory.findMany({ include: { products: true } });
  cats.forEach(c => {
      console.log(`Cat: ${c.name} has ${c.products.length} products`);
  });
}
check().finally(() => prisma.$disconnect());
