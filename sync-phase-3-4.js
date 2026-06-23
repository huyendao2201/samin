const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sitemapUrl = 'https://samin.vn/post-sitemap.xml';

function processContent(html) {
  const $ = cheerio.load(html);
  
  let title = $('h1.entry-title').text().trim();
  if (!title) title = $('h1').first().text().trim();

  let container = $('.elementor-widget-theme-post-content');
  if (container.length === 0) container = $('.entry-content');
  if (container.length === 0) container = $('main');

  let cleanContent = '';
  let excerpt = '';
  
  if (container.length > 0) {
     container.find('script, style, .elementor-invisible, nav, .ez-toc-title-container, .ez-toc-v2_0_69_1').remove();
     
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
                 if (!excerpt) excerpt = text.substring(0, 150) + '...';
             } else if (tagName === 'ul') {
                 let liContent = '';
                 $(el).find('li').each((_, li) => {
                     liContent += `<li class="mb-2"><strong>${$(li).find('strong').text() || ''}</strong> ${$(li).text().replace($(li).find('strong').text(), '').trim()}</li>\n`;
                 });
                 cleanContent += `<ul class="list-disc ml-6 space-y-2 mb-6 text-slate-700">\n${liContent}</ul>\n`;
             }
         }
     });
  }
  return { title, content: cleanContent, excerpt };
}

async function main() {
  console.log("=== BẮT ĐẦU ĐỒNG BỘ KIẾN THỨC & TUYỂN DỤNG ===");

  const sitemapRes = await fetch(sitemapUrl);
  const sitemapXml = await sitemapRes.text();
  const $sitemap = cheerio.load(sitemapXml, { xmlMode: true });
  
  const urls = [];
  $sitemap('loc').each((i, el) => {
     urls.push($sitemap(el).text());
  });

  console.log(`Tìm thấy ${urls.length} bài viết.`);

  await prisma.post.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.postCategory.deleteMany({});

  const category = await prisma.postCategory.create({
      data: { name: "Kiến thức chuyên ngành", slug: "kien-thuc-chuyen-nganh", description: "Chia sẻ kinh nghiệm xây dựng nhà xưởng" }
  });

  for (const url of urls) {
      try {
          const res = await fetch(url);
          const html = await res.text();
          const data = processContent(html);
          
          let slug = url.replace(/\/$/, '').split('/').pop() || Math.random().toString(36).substring(7);

          if (!data.title) data.title = slug.replace(/-/g, ' ');

          if (slug.includes('tuyen-dung')) {
              console.log(` -> Tuyển dụng: ${data.title}`);
              await prisma.job.create({
                  data: {
                      title: data.title,
                      slug: slug,
                      department: "Khối thi công & văn phòng",
                      location: "Hà Nội",
                      type: "Toàn thời gian",
                      salary: "Thỏa thuận",
                      deadline: "Đang tuyển",
                      description: data.content || data.excerpt || "Tuyển dụng nhân sự SAMIN"
                  }
              });
          } else {
              console.log(` -> Bài viết: ${data.title}`);
              await prisma.post.create({
                  data: {
                      title: data.title,
                      slug: slug,
                      excerpt: data.excerpt || "Đang cập nhật nội dung...",
                      content: data.content,
                      imageUrl: "/images/hero.png",
                      categoryId: category.id
                  }
              });
          }
      } catch (e) {
          console.log(`    ❌ Lỗi tải URL ${url}: ${e.message}`);
      }
  }

  console.log("=== HOÀN TẤT ĐỒNG BỘ ===");
}

main().finally(() => prisma.$disconnect());
