const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.service.count();
  if (count === 0) {
    console.log("Seeding Services...");
    await prisma.service.createMany({
      data: [
        {
          title: "Thi công Nhà xưởng Kết cấu thép",
          slug: "thi-cong-nha-xuong-ket-cau-thep",
          description: "Giải pháp trọn gói thiết kế và thi công nhà xưởng bằng kết cấu thép chuẩn quốc tế.",
          imageUrl: "/images/steel.png"
        },
        {
          title: "Thi công Mái tôn Công nghiệp",
          slug: "thi-cong-mai-ton-cong-nghiep",
          description: "Chuyên lợp mái, thay mái tôn nhà xưởng với độ bền cao và khả năng chống nóng vượt trội.",
          imageUrl: "/images/roof.png"
        },
        {
          title: "Nâng cấp & Cải tạo Nhà xưởng",
          slug: "nang-cap-cai-tao-nha-xuong",
          description: "Mở rộng quy mô, gia cố kết cấu và bảo trì nhà xưởng hiện hữu.",
          imageUrl: "/images/hero.png"
        }
      ]
    });
  }

  const catCount = await prisma.productCategory.count();
  if (catCount === 0) {
    console.log("Seeding Products...");
    const cat = await prisma.productCategory.create({
      data: { name: "Vật tư phụ", slug: "vat-tu-phu" }
    });
    
    await prisma.product.createMany({
      data: [
        {
          name: "Tôn lạnh màu mạ kẽm",
          slug: "ton-lanh-mau-ma-kem",
          description: "Tôn lạnh màu mạ kẽm cao cấp, chống ăn mòn hiệu quả cho mọi điều kiện thời tiết.",
          imageUrl: "/images/roof.png",
          categoryId: cat.id
        },
        {
          name: "Xà gồ Z mạ kẽm",
          slug: "xa-go-z-ma-kem",
          description: "Xà gồ Z mạ kẽm cường độ cao, chịu lực tốt, lý tưởng cho kết cấu mái lớn.",
          imageUrl: "/images/steel.png",
          categoryId: cat.id
        }
      ]
    });
  }

  console.log("Seed complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
