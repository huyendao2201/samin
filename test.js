const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('test.html', 'utf8');
const $ = cheerio.load(html);

$('h3').each((i, el) => {
    const title = $(el).text().trim();
    if (title.length > 5 && !title.includes('Các dịch vụ')) {
        let a = $(el).find('a').attr('href');
        if (!a) a = $(el).closest('.elementor-widget-wrap').find('a').attr('href');
        console.log(title, '=>', a);
    }
});
