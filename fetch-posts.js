const cheerio = require('cheerio');

async function check() {
  const res = await fetch('https://samin.vn/post-sitemap.xml');
  const text = await res.text();
  const $ = cheerio.load(text, { xmlMode: true });
  
  const urls = [];
  $('loc').each((i, el) => {
     urls.push($(el).text());
  });
  console.log("Found", urls.length, "posts");
  console.log(urls);
}
check();
