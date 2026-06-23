const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const products = await prisma.product.findMany();
  for (const p of products) {
     const url = `https://samin.vn/san-pham/${p.slug}/`;
     try {
       const res = await fetch(url);
       const html = await res.text();
       const $ = cheerio.load(html);
       
       let img = $('.woocommerce-product-gallery__image img').first().attr('src');
       if (!img) img = $('.wp-post-image').first().attr('src');
       if (!img) img = $('meta[property="og:image"]').attr('content');
       
       if (img) {
          console.log(`Found image for ${p.name}: ${img}`);
          await prisma.product.update({
             where: { id: p.id },
             data: { imageUrl: img }
          });
       } else {
          console.log(`NO IMAGE FOUND FOR: ${p.name}`);
       }
     } catch (e) {
       console.log(`Error fetching ${url}: ${e.message}`);
     }
  }
}

run().finally(() => prisma.$disconnect());
