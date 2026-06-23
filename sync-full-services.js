const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { slug: "mai-ton-nha-xuong", url: "https://samin.vn/danh-muc-dich-vu/dich-vu-mai-ton-nha-xuong/" },
  { slug: "ket-cau-thep", url: "https://samin.vn/danh-muc-dich-vu/thi-cong-nha-xuong-ket-cau-thep/" },
  { slug: "nang-cap-cai-tao", url: "https://samin.vn/danh-muc-dich-vu/nang-cap-cai-tao-nha-xuong/" },
  { slug: "kho-lanh", url: "https://samin.vn/danh-muc-dich-vu/kho-lanh-cong-trinh-phu-tro/" }
];

function extractSubLinks(html) {
  const $ = cheerio.load(html);
  const links = [];
  $('h3').each((i, el) => {
      const title = $(el).text().trim();
      if (title.length > 5 && !title.includes('Các dịch vụ') && !title.includes('Chúng tôi cung cấp') && !title.includes('Khảo sát')) {
          let a = $(el).find('a').attr('href');
          if (!a) a = $(el).closest('.elementor-widget-wrap').find('a').attr('href');
          const desc = $(el).closest('.elementor-widget-wrap').find('p').text().trim() || title;
          
          if (a && a.startsWith('http')) {
              links.push({ title, url: a, desc });
          }
      }
  });
  return links;
}

function processContent(html) {
  const $ = cheerio.load(html);
  let container = $('.elementor-widget-theme-post-content');
  if (container.length === 0) container = $('.entry-content');
  if (container.length === 0) container = $('main');

  if (container.length > 0) {
     container.find('script, style, .elementor-invisible, nav, .ez-toc-title-container, .ez-toc-v2_0_69_1, .e-con-inner').remove();
     
     let cleanContent = '';
     container.find('h2, h3, p, ul').each((i, el) => {
         const text = $(el).text().trim();
         const tagName = $(el).prop('tagName').toLowerCase();
         if (text.length > 0 && !text.includes('Bài viết trước') && !text.includes('NỘI DUNG CHÍNH')) {
             if (tagName === 'h2') {
                 cleanContent += `<h2 class="text-2xl font-bold mt-10 mb-4 text-slate-900">${text}</h2>\n`;
             } else if (tagName === 'h3') {
                 cleanContent += `<h3 class="text-xl font-bold mt-8 mb-3 text-slate-800">${text}</h3>\n`;
             } else if (tagName === 'p') {
                 cleanContent += `<p class="text-slate-700 leading-relaxed mb-4">${$(el).html()}</p>\n`;
             } else if (tagName === 'ul') {
                 let liContent = '';
                 $(el).find('li').each((_, li) => {
                     liContent += `<li class="mb-2"><strong>${$(li).find('strong').text() || ''}</strong> ${$(li).text().replace($(li).find('strong').text(), '').trim()}</li>\n`;
                 });
                 cleanContent += `<ul class="list-disc ml-6 space-y-2 mb-6 text-slate-700">\n${liContent}</ul>\n`;
             }
         }
     });
     return cleanContent;
  }
  return '';
}

async function main() {
  console.log("=== BẮT ĐẦU CÀO FULL DATA CHI TIẾT ===");

  for (const cat of categories) {
    console.log(`\nĐang quét danh mục: ${cat.slug}`);
    const parent = await prisma.service.findUnique({ where: { slug: cat.slug } });
    if (!parent) continue;

    const res = await fetch(cat.url);
    const html = await res.text();
    const subItems = extractSubLinks(html);
    
    await prisma.service.deleteMany({ where: { parentId: parent.id } });

    for (const item of subItems) {
       console.log(` -> Tải chi tiết: ${item.title}`);
       try {
         const detailRes = await fetch(item.url);
         const detailHtml = await detailRes.text();
         let content = processContent(detailHtml);
         
         if (!content || content.length < 50) {
             content = `<h2 class="text-2xl font-bold mb-4">${item.title}</h2><p class="text-slate-700">${item.desc}</p>`;
         }

         let slug = item.url.replace(/\/$/, '').split('/').pop() || Math.random().toString(36).substring(7);

         await prisma.service.create({
            data: {
              title: item.title,
              slug: slug,
              description: item.desc.substring(0, 150),
              imageUrl: "/images/hero.png",
              parentId: parent.id,
              content: content
            }
         });
       } catch (e) {
         console.log(`    ❌ Lỗi: ${e.message}`);
       }
    }
  }
  
  console.log("=== HOÀN TẤT ĐỒNG BỘ FULL CHI TIẾT ===");
}

main().finally(() => prisma.$disconnect());
