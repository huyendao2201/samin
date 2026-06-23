const cheerio = require('cheerio');

async function checkMenu() {
  const res = await fetch('https://samin.vn/');
  const html = await res.text();
  const $ = cheerio.load(html);

  const links = [];
  $('li.menu-item a').each((i, el) => {
      links.push({
          text: $(el).text().trim(),
          href: $(el).attr('href')
      });
  });
  console.log("ALL MENU LINKS:");
  console.log(links);
}
checkMenu();
