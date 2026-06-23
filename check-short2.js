const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.findMany().then(r => {
    console.log(r.filter(s => s.content && s.content.length < 1000).map(s => s.title));
}).finally(() => prisma.$disconnect());
