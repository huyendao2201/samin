const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const res = await prisma.service.findMany({ include: { children: true } });
  res.filter(r => !r.parentId).forEach(r => console.log(r.title, 'has', r.children.length, 'children'));
}
check().finally(() => prisma.$disconnect());
