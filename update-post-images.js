const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const posts = await prisma.post.findMany();
  const images = ['/images/steel.png', '/images/roof.png', '/images/hero.png', '/images/about.png'];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    // Assign a different image based on index to create variety
    const newImageUrl = images[i % images.length];
    
    await prisma.post.update({
      where: { id: post.id },
      data: { imageUrl: newImageUrl }
    });
  }
  
  console.log('Updated post images successfully!');
}

run().finally(() => prisma.$disconnect());
