const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  const allServices = await prisma.service.findMany({ where: { parentId: null }, include: { children: true } });
  
  for (const s of allServices) {
    if (s.children.length === 0) {
      console.log("Deleting empty category:", s.title);
      await prisma.service.delete({ where: { id: s.id } });
    }
  }
}

clean().finally(() => prisma.$disconnect());
