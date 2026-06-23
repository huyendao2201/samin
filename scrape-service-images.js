const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const services = await prisma.service.findMany({ where: { imageUrl: '/images/hero.png' } });
  for (const s of services) {
     const url = `https://samin.vn/dich-vu/${s.slug}/`;
     try {
       const res = await fetch(url);
       if (!res.ok) continue;
       const html = await res.text();
       const $ = cheerio.load(html);
       
       let img = $('.elementor-widget-theme-post-content img').first().attr('src');
       if (!img) img = $('.entry-content img').first().attr('src');
       if (!img) img = $('meta[property="og:image"]').attr('content');
       
       if (img) {
          console.log(`Found image for Service ${s.title}: ${img}`);
          await prisma.service.update({
             where: { id: s.id },
             data: { imageUrl: img }
          });
       }
     } catch (e) {}
  }
}

run().finally(() => prisma.$disconnect());
