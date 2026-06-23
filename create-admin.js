const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findFirst({ where: { email: 'admin@samin.vn' } });
  if (!user) {
    await prisma.user.create({
      data: {
        email: 'admin@samin.vn',
        password: 'admin', // Trong thực tế nên dùng bcrypt
        name: 'Quản trị viên'
      }
    });
    console.log("Created admin user: admin@samin.vn / admin");
  } else {
    console.log("Admin user already exists");
  }
}
run().finally(() => prisma.$disconnect());
