const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const slides = [
  {
    title: "Giải pháp Nhà Xưởng & Kết Cấu Thép",
    description: "CÔNG TY SAMIN chuyên cung cấp giải pháp nhà xưởng kết cấu thép cho doanh nghiệp, cơ sở gia công và chế biến. Cam kết mang đến công trình bền vững, an toàn và hiệu quả.",
    image: "/images/hero.png",
  },
  {
    title: "Thi Công Mái Tôn Công Nghiệp",
    description: "Khắc phục triệt để tình trạng dột nước, cách nhiệt kém. Chúng tôi cung cấp giải pháp mái tôn bền vững, bảo hành dài hạn cho các nhà xưởng quy mô lớn.",
    image: "/images/roof.png",
  },
  {
    title: "Nâng Cấp & Cải Tạo Nhà Xưởng",
    description: "Mở rộng quy mô sản xuất và tối ưu công năng sử dụng mà không cần xây mới hoàn toàn. Cải tạo hệ thống thông gió, vách ngăn và nền xưởng.",
    image: "/images/about.png",
  },
];

async function run() {
  await prisma.setting.upsert({
    where: { key: 'homepage_slider' },
    update: { value: JSON.stringify(slides) },
    create: { key: 'homepage_slider', value: JSON.stringify(slides) }
  });
  console.log("Seeded default slider data to Database successfully!");
}

run().finally(() => prisma.$disconnect());
