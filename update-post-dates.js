const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const targetDate = new Date('2026-06-02T08:00:00.000Z');

  await prisma.post.updateMany({
    data: {
      createdAt: targetDate,
      updatedAt: targetDate
    }
  });

  console.log('Updated all post dates to 2/6/2026 successfully!');
}

run().finally(() => prisma.$disconnect());
