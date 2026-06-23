const cheerio = require('cheerio');

async function getArticle(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Elementor stores content in various ways. Let's find the main post container
  let container = $('.elementor-widget-theme-post-content');
  if (container.length === 0) container = $('.entry-content');
  if (container.length === 0) container = $('main');

  if (container.length > 0) {
     console.log("Found container:", container.prop('tagName'), container.attr('class'));
     // Let's strip out script tags, style tags, and elementor specific bloated divs
     container.find('script, style, .elementor-invisible, nav').remove();
     
     // Extract all headers, paragraphs, and lists
     let cleanContent = '';
     container.find('h2, h3, p, ul').each((i, el) => {
         // Skip empty or nav related
         const text = $(el).text().trim();
         if (text.length > 0 && !text.includes('Bài viết trước') && !text.includes('NỘI DUNG CHÍNH')) {
             cleanContent += $.html(el) + '\\n';
         }
     });
     console.log(cleanContent.substring(0, 1500));
  } else {
     console.log("No container found");
  }
}

getArticle('https://samin.vn/dich-vu/thay-ton-vach-bao-che-vien-diem/');
