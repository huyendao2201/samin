async function checkProductSitemap() {
  const res = await fetch('https://samin.vn/product-sitemap.xml');
  const text = await res.text();
  console.log(text.substring(0, 1000));
}
checkProductSitemap();
