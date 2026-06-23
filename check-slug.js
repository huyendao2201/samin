const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.findUnique({ where: { slug: 'thay-ton-vach-bao-che-vien-diem' } }).then(s => console.log(s ? s.content : 'NOT FOUND')).finally(() => prisma.$disconnect());
