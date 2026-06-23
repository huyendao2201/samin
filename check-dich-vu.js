const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://samin.vn/cac-dich-vu/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const h3s = [];
  $('h3').each((i, el) => {
     h3s.push($(el).text().trim());
  });
  console.log("H3s on /cac-dich-vu/:");
  console.log(h3s);
}
check();
