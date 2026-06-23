const cheerio = require('cheerio');

const urls = [
  "https://samin.vn/danh-muc-dich-vu/thi-cong-nha-xuong-ket-cau-thep/",
  "https://samin.vn/danh-muc-dich-vu/nang-cap-cai-tao-nha-xuong/",
  "https://samin.vn/danh-muc-dich-vu/kho-lanh-cong-trinh-phu-tro/"
];

async function scan() {
  for (const url of urls) {
    try {
      console.log(`\n=== URL: ${url} ===`);
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      const items = [];
      $('h3').each((i, el) => {
          const title = $(el).text().trim();
          if (title && !title.includes('Các dịch vụ') && !title.includes('Chúng tôi cung cấp') && !title.includes('Khảo sát') && title.length > 5 && title.length < 150) {
              const container = $(el).closest('.elementor-widget-wrap, .elementor-container, .elementor-column');
              const desc = container.find('p').text().trim();
              items.push({ title, desc: desc.substring(0, 100) });
          }
      });
      console.log("Sub-items found:", items);
    } catch (e) {
      console.log("Error:", e.message);
    }
  }
}

scan();
