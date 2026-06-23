const cheerio = require('cheerio');

async function checkSitemap() {
  const res = await fetch('https://samin.vn/service-sitemap.xml');
  const text = await res.text();
  const $ = cheerio.load(text, { xmlMode: true });
  
  const urls = [];
  $('loc').each((i, el) => {
     urls.push($(el).text());
  });
  console.log("Found", urls.length, "services");
  console.log(urls);
}
checkSitemap();
