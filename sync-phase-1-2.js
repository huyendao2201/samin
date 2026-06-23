const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== BẮT ĐẦU ĐỒNG BỘ GIAI ĐOẠN 1 & 2 ===");

  // --- GIAI ĐOẠN 1: HOÀN THIỆN DỊCH VỤ ---
  console.log("\\n[1] Đồng bộ Dịch vụ (Cha - Con)...");
  
  const servicesData = [
    {
      parentSlug: "ket-cau-thep",
      children: [
        {
          title: "Nhà xưởng kết cấu thép vừa và nhỏ",
          slug: "nha-xuong-vua-nho",
          description: "Giải pháp tiết kiệm, phù hợp doanh nghiệp nông sản, thủy sản cần không gian sản xuất nhanh chóng.",
          imageUrl: "/images/steel.png"
        },
        {
          title: "Gia công & lắp dựng khung thép",
          slug: "gia-cong-lap-dung-khung-thep",
          description: "Sản xuất khung, dầm, vì kèo theo tiêu chuẩn kỹ thuật, thi công lắp dựng trực tiếp tại công trình.",
          imageUrl: "/images/hero.png"
        },
        {
          title: "Thiết kế nhà thép tiền chế",
          slug: "thiet-ke-nha-thep",
          description: "Tối ưu tải trọng, nhịp và công năng sử dụng, mang lại bản vẽ chi tiết và an toàn nhất.",
          imageUrl: "/images/about.png"
        },
        {
          title: "Nhà xưởng logistic, kho bãi",
          slug: "nha-xuong-logistic",
          description: "Thiết kế phù hợp chức năng lưu trữ hàng hóa lớn, tải trọng nặng, thông thoáng và an toàn PCCC.",
          imageUrl: "/images/roof.png"
        }
      ]
    },
    {
      parentSlug: "nang-cap-cai-tao",
      children: [
        {
          title: "Bố trí lại mặt bằng sản xuất",
          slug: "bo-tri-mat-bang",
          description: "Sắp xếp lại khu vực sản xuất, văn phòng, kho phụ trợ bằng khung thép nhẹ một cách linh hoạt.",
          imageUrl: "/images/about.png"
        },
        {
          title: "Cải tạo, thay vách panel – tôn",
          slug: "cai-tao-vach-panel",
          description: "Nâng cấp cách nhiệt, chống ồn, chống dột cho các nhà máy yêu cầu cao về môi trường sản xuất.",
          imageUrl: "/images/roof.png"
        },
        {
          title: "Gia cường khung, cột, dầm thép",
          slug: "gia-cuong-khung-cot",
          description: "Thay thế, bổ sung thép chịu lực cho công trình hiện có khi cần lắp thêm cẩu trục hoặc máy móc nặng.",
          imageUrl: "/images/steel.png"
        },
        {
          title: "Mở rộng diện tích nhà xưởng",
          slug: "mo-rong-dien-tich",
          description: "Kéo dài khung, nâng tầng, tăng nhịp cột bằng kết cấu thép một cách an toàn trên nền móng cũ.",
          imageUrl: "/images/hero.png"
        }
      ]
    },
    {
      parentSlug: "kho-lanh",
      children: [
        {
          title: "Cải tạo & nâng cấp kho lạnh cũ",
          slug: "cai-tao-kho-lanh",
          description: "Thay panel, cải tạo khung thép, nâng cấp hệ thống làm lạnh giúp tối ưu chi phí vận hành.",
          imageUrl: "/images/hero.png"
        },
        {
          title: "Giải pháp kho mát, kho đông sâu",
          slug: "kho-mat-kho-dong",
          description: "Tùy biến nhiệt độ theo nhu cầu lưu trữ (từ mát đến âm sâu) cho thực phẩm, thuốc men.",
          imageUrl: "/images/steel.png"
        },
        {
          title: "Nhà kho bảo quản nông sản xuất khẩu",
          slug: "kho-bao-quan-nong-san",
          description: "Giải pháp chống ẩm, chống mốc, đảm bảo tiêu chuẩn khắt khe cho hàng hóa xuất khẩu.",
          imageUrl: "/images/roof.png"
        },
        {
          title: "Kho lạnh panel kết hợp khung thép",
          slug: "kho-lanh-panel-thep",
          description: "Thiết kế, lắp dựng khung thép và bao che bằng panel PU/PIR, EPS cho độ kín khít tuyệt đối.",
          imageUrl: "/images/about.png"
        }
      ]
    }
  ];

  for (const group of servicesData) {
    const parent = await prisma.service.findUnique({ where: { slug: group.parentSlug } });
    if (parent) {
      // Xóa children cũ nếu có
      await prisma.service.deleteMany({ where: { parentId: parent.id } });
      
      // Tạo children mới
      for (const child of group.children) {
        await prisma.service.create({
          data: {
            title: child.title,
            slug: child.slug,
            description: child.description,
            imageUrl: child.imageUrl,
            parentId: parent.id,
            content: "<h2 class='text-2xl font-bold mb-4 text-slate-900'>" + child.title + "</h2><p class='text-slate-700 leading-relaxed'>" + child.description + "</p>"
          }
        });
      }
      console.log(`✅ Đã đồng bộ Sub-services cho: ${group.parentSlug}`);
    }
  }


  // --- GIAI ĐOẠN 2: HOÀN THIỆN SẢN PHẨM & DANH MỤC ---
  console.log("\\n[2] Đồng bộ Danh mục Sản phẩm & Vật tư...");

  const productCategories = [
    { name: "Tôn lợp", slug: "ton-lop" },
    { name: "Inox - SUS", slug: "inox-sus" },
    { name: "Thép - Steel", slug: "thep-steel" },
    { name: "Kim loại tấm", slug: "kim-loai-tam" }
  ];

  // Xóa toàn bộ sản phẩm và danh mục cũ để làm sạch (nếu cần, nhưng cứ upsert cho chắc)
  for (const cat of productCategories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug, description: `Danh mục vật tư ${cat.name}` }
    });
  }

  const catTon = await prisma.productCategory.findUnique({ where: { slug: "ton-lop" }});
  const catInox = await prisma.productCategory.findUnique({ where: { slug: "inox-sus" }});
  const catThep = await prisma.productCategory.findUnique({ where: { slug: "thep-steel" }});
  const catKimLoai = await prisma.productCategory.findUnique({ where: { slug: "kim-loai-tam" }});

  const productsData = [
    // Tôn lợp
    { name: "Tôn lạnh chống nóng 3 lớp PU", slug: "ton-lanh-pu", categoryId: catTon.id, imageUrl: "/images/roof.png", desc: "Tôn lợp cách nhiệt hiệu quả, giảm tiếng ồn, tăng tuổi thọ công trình." },
    { name: "Tôn sóng vuông 5 sóng / 9 sóng", slug: "ton-song-vuong", categoryId: catTon.id, imageUrl: "/images/roof.png", desc: "Dòng tôn phổ biến nhất cho nhà xưởng, biên dạng sóng cao, thoát nước tốt." },
    { name: "Tôn không vít Seamlock / Cliplock", slug: "ton-seamlock", categoryId: catTon.id, imageUrl: "/images/roof.png", desc: "Hệ tôn lợp mái tuyệt đối chống dột, chịu được gió bão giật cấp cao." },
    
    // Inox
    { name: "Inox 304 dạng tấm", slug: "inox-304-tam", categoryId: catInox.id, imageUrl: "/images/steel.png", desc: "Vật liệu chống ăn mòn cực tốt, ứng dụng cho công nghiệp thực phẩm, y tế." },
    { name: "Inox cuộn 316 chịu hóa chất", slug: "inox-316-cuon", categoryId: catInox.id, imageUrl: "/images/steel.png", desc: "Khả năng chống gỉ sét tuyệt đối trong môi trường muối biển hoặc hóa chất." },
    
    // Thép
    { name: "Thép hình H, I, U, V", slug: "thep-hinh", categoryId: catThep.id, imageUrl: "/images/hero.png", desc: "Cấu kiện thép định hình sẵn, dùng làm cột, dầm chính trong nhà tiền chế." },
    { name: "Xà gồ chữ C, Z mạ kẽm", slug: "xa-go-c-z", categoryId: catThep.id, imageUrl: "/images/hero.png", desc: "Hệ đỡ mái tôn nhẹ, cường độ cao, lớp mạ kẽm chống gỉ sét lâu dài." },
    
    // Kim loại tấm
    { name: "Gia công cắt Laser CNC", slug: "cat-laser-cnc", categoryId: catKimLoai.id, imageUrl: "/images/about.png", desc: "Cắt hoa văn, chi tiết cơ khí chính xác cao trên vật liệu thép, inox, nhôm." },
    { name: "Chấn gấp định hình kim loại", slug: "chan-gap-kim-loai", categoryId: catKimLoai.id, imageUrl: "/images/about.png", desc: "Dịch vụ chấn dập CNC tạo góc cạnh cho máng xối, diềm mái, tủ điện." }
  ];

  await prisma.product.deleteMany({}); // Reset data sản phẩm để sạch đẹp
  
  for (const prod of productsData) {
    await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        description: prod.desc,
        imageUrl: prod.imageUrl,
        categoryId: prod.categoryId,
        content: `<h2 class="text-2xl font-bold mb-4 text-slate-900">${prod.name}</h2><p class="text-slate-700 text-lg mb-6">${prod.desc}</p><p class="text-slate-600">SAMIN cung cấp vật tư chính hãng, giá tốt nhất từ nhà máy. Sản phẩm có đầy đủ chứng chỉ CO/CQ, hỗ trợ vận chuyển tận công trình.</p>`
      }
    });
  }
  console.log("✅ Đã đồng bộ Sản phẩm & Vật tư");

  console.log("\\n=== HOÀN TẤT GIAI ĐOẠN 1 & 2 ===");
}

main().catch(console.error).finally(() => prisma.$disconnect());
