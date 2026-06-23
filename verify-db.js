const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const services = await prisma.service.findMany({ include: { children: true } });
  let emptyContentCount = 0;
  for (const s of services) {
     if (!s.content || s.content.trim() === '') {
         console.log("Service with NO content:", s.title, "slug:", s.slug, "has children:", s.children.length);
         emptyContentCount++;
     } else if (s.content.length < 100) {
         console.log("Service with VERY SHORT content:", s.title, s.content);
     }
  }
  console.log(`Total services: ${services.length}. Missing content: ${emptyContentCount}`);

  // Also check products
  const products = await prisma.product.findMany();
  let emptyProdCount = 0;
  for (const p of products) {
     if (!p.content || p.content.trim() === '') {
         console.log("Product with NO content:", p.name);
         emptyProdCount++;
     }
  }
  console.log(`Total products: ${products.length}. Missing content: ${emptyProdCount}`);
}
check().finally(() => prisma.$disconnect());
