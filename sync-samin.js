const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

const servicesUrls = [
  { slug: "mai-ton-nha-xuong", url: "https://samin.vn/danh-muc-dich-vu/dich-vu-mai-ton-nha-xuong/" },
  { slug: "ket-cau-thep", url: "https://samin.vn/danh-muc-dich-vu/thi-cong-nha-xuong-ket-cau-thep/" },
  { slug: "nang-cap-cai-tao", url: "https://samin.vn/danh-muc-dich-vu/nang-cap-cai-tao-nha-xuong/" },
  { slug: "kho-lanh", url: "https://samin.vn/danh-muc-dich-vu/kho-lanh-cong-trinh-phu-tro/" }
];

const productsUrls = [
  { slug: "ton-lop", url: "https://samin.vn/danh-muc-san-pham/ton-lop/" },
  { slug: "inox-sus", url: "https://samin.vn/danh-muc-san-pham/inox-sus/" },
  { slug: "thep-steel", url: "https://samin.vn/danh-muc-san-pham/thep-steel/" },
  { slug: "kim-loai-tam", url: "https://samin.vn/danh-muc-san-pham/kim-loai-tam/" }
];

async function scrapeAndSync() {
  console.log("Bắt đầu lấy dữ liệu từ samin.vn...");

  for (const item of servicesUrls) {
    try {
      console.log(`Đang tải: ${item.url}`);
      const res = await fetch(item.url);
      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $('h1').first().text().trim() || item.slug;
      
      let contentHtml = $('.elementor-widget-theme-post-content').html() || $('.entry-content').html() || '';
      
      if (!contentHtml) {
        contentHtml = '<div class="space-y-4 text-slate-700">' + $('p').map((i, el) => `<p>${$(el).text()}</p>`).get().join('') + '</div>';
      } else {
        contentHtml = contentHtml.replace(/<p/g, '<p class="mb-4 text-slate-700 leading-relaxed"');
        contentHtml = contentHtml.replace(/<h2/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-900"');
        contentHtml = contentHtml.replace(/<img/g, '<img class="rounded-xl shadow-lg my-6 max-w-full h-auto"');
      }

      await prisma.service.upsert({
        where: { slug: item.slug },
        update: {
          title: title !== item.slug ? title : undefined,
          content: contentHtml,
        },
        create: {
          slug: item.slug,
          title: title !== item.slug ? title : item.slug.replace(/-/g, ' '),
          content: contentHtml,
          description: "Chi tiết dịch vụ " + title,
          isActive: true
        }
      });
      console.log(`✅ Cập nhật Dịch vụ thành công: ${item.slug}`);
    } catch (e) {
      console.log(`❌ Lỗi khi tải ${item.url}:`, e.message);
    }
  }

  const cat = await prisma.productCategory.findFirst() || await prisma.productCategory.create({ data: { name: 'Chung', slug: 'chung' }});

  for (const item of productsUrls) {
    try {
      console.log(`Đang tải: ${item.url}`);
      const res = await fetch(item.url);
      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $('h1').first().text().trim() || item.slug;
      let contentHtml = $('.entry-content').html() || $('.elementor-widget-theme-post-content').html() || '';
      
      if (!contentHtml) {
        contentHtml = '<div class="space-y-4 text-slate-700">' + $('p').map((i, el) => `<p>${$(el).text()}</p>`).get().join('') + '</div>';
      } else {
        contentHtml = contentHtml.replace(/<p/g, '<p class="mb-4 text-slate-700 leading-relaxed"');
        contentHtml = contentHtml.replace(/<h2/g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-900"');
        contentHtml = contentHtml.replace(/<img/g, '<img class="rounded-xl shadow-lg my-6 max-w-full h-auto"');
      }

      await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          name: title !== item.slug ? title : undefined,
          content: contentHtml,
        },
        create: {
          slug: item.slug,
          name: title !== item.slug ? title : item.slug.replace(/-/g, ' '),
          content: contentHtml,
          categoryId: cat.id,
          isActive: true
        }
      });
      console.log(`✅ Cập nhật Sản phẩm thành công: ${item.slug}`);
    } catch (e) {
      console.log(`❌ Lỗi khi tải ${item.url}:`, e.message);
    }
  }

  console.log("Hoàn tất lấy dữ liệu!");
}

scrapeAndSync()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
