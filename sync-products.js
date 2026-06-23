const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sitemapUrl = 'https://samin.vn/product-sitemap.xml';

function processProduct(html) {
  const $ = cheerio.load(html);
  
  let name = $('h1.product_title').text().trim() || $('h1').first().text().trim();
  
  let descContainer = $('.woocommerce-product-details__short-description');
  if (descContainer.length === 0) descContainer = $('.elementor-widget-theme-post-excerpt');
  let description = descContainer.text().trim();
  
  let contentContainer = $('.woocommerce-Tabs-panel--description');
  if (contentContainer.length === 0) contentContainer = $('.entry-content');
  if (contentContainer.length === 0) contentContainer = $('main');

  let cleanContent = '';
  
  if (contentContainer.length > 0) {
     contentContainer.find('script, style, nav, .ez-toc-v2_0_69_1, .product_meta').remove();
     
     contentContainer.find('h2, h3, p, ul').each((i, el) => {
         const text = $(el).text().trim();
         const tagName = $(el).prop('tagName').toLowerCase();
         if (text.length > 0) {
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
  }

  // Get a category from breadcrumb
  let catSlug = 'ton-lop';
  const breadcrumb = $('.woocommerce-breadcrumb').text() || '';
  if (breadcrumb.toLowerCase().includes('inox')) catSlug = 'inox-sus';
  else if (breadcrumb.toLowerCase().includes('thép')) catSlug = 'thep-steel';
  else if (breadcrumb.toLowerCase().includes('kim loại')) catSlug = 'kim-loai-tam';

  return { name, description, content: cleanContent, catSlug };
}

async function main() {
  console.log("=== BẮT ĐẦU ĐỒNG BỘ SẢN PHẨM ===");

  const sitemapRes = await fetch(sitemapUrl);
  const sitemapXml = await sitemapRes.text();
  const $sitemap = cheerio.load(sitemapXml, { xmlMode: true });
  
  const urls = [];
  $sitemap('loc').each((i, el) => {
     urls.push($sitemap(el).text());
  });

  console.log(`Tìm thấy ${urls.length} sản phẩm.`);

  await prisma.product.deleteMany({});
  
  const cats = await prisma.productCategory.findMany();
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c.id);

  for (const url of urls) {
      try {
          const res = await fetch(url);
          const html = await res.text();
          const data = processProduct(html);
          
          let slug = url.replace(/\/$/, '').split('/').pop() || Math.random().toString(36).substring(7);

          if (!data.name) data.name = slug.replace(/-/g, ' ');

          console.log(` -> Đang xử lý: ${data.name}`);
          
          await prisma.product.create({
              data: {
                  name: data.name,
                  slug: slug,
                  description: (data.description || data.name).substring(0, 200),
                  content: data.content,
                  imageUrl: "/images/roof.png",
                  categoryId: catMap[data.catSlug] || cats[0].id
              }
          });
      } catch (e) {
          console.log(`    ❌ Lỗi: ${e.message}`);
      }
  }

  console.log("=== HOÀN TẤT ĐỒNG BỘ SẢN PHẨM ===");
}

main().finally(() => prisma.$disconnect());
