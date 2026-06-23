async function checkSitemap() {
  try {
    const res = await fetch('https://samin.vn/sitemap_index.xml');
    const text = await res.text();
    console.log(text.substring(0, 1000));
  } catch (e) {
    console.log(e.message);
  }
}
checkSitemap();
