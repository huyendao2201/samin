const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const parentSlug = 'mai-ton-nha-xuong';
  const parent = await prisma.service.findUnique({ where: { slug: parentSlug } });
  
  if (!parent) {
    console.log("Parent not found!");
    return;
  }

  // Clear existing children
  await prisma.service.deleteMany({ where: { parentId: parent.id } });

  const subServices = [
    {
      title: "Thay tôn vách bao che, viền diềm",
      slug: "thay-ton-vach-bao-che",
      description: "Việc thay tôn vách bao che và viền diềm là cần thiết khi mái tôn đã xuống cấp, có dấu hiệu gỉ sét, hoặc bị hư hỏng do thời tiết. Thay thế sớm giúp bảo vệ công trình khỏi dột, thấm dột, và tăng tính thẩm mỹ.",
      imageUrl: "/images/roof.png"
    },
    {
      title: "Thay máng xối, diềm úp nóc",
      slug: "thay-mang-xoi",
      description: "SAMIN giúp bạn thay máng xối, diềm úp nóc; giúp bạn thay thế, sửa chữa máng xối và diềm úp nóc bị hư hỏng, đảm bảo hệ thống thoát nước của xưởng hoạt động hiệu quả.",
      imageUrl: "/images/hero.png"
    },
    {
      title: "Thay tôn sáng",
      slug: "thay-ton-sang",
      description: "SAMIN sẽ thay thế các tấm lợp mái bằng tôn thông thường bằng các tấm tôn lấy sáng để tăng cường ánh sáng tự nhiên cho công trình. Thay tôn sáng bao gồm: Tháo dỡ mái tôn cũ...",
      imageUrl: "/images/steel.png"
    },
    {
      title: "Gia cường khung mái, thay xà gồ thép",
      slug: "gia-cuong-khung-mai",
      description: "Dịch vụ gia cường khung mái và thay xà gồ thép giúp tăng khả năng chịu lực của mái nhà xưởng, đảm bảo an toàn khi sử dụng lâu dài. Chúng tôi thực hiện kiểm tra, hàn bổ sung...",
      imageUrl: "/images/about.png"
    },
    {
      title: "Mái tôn cách nhiệt, panel chống nóng",
      slug: "mai-ton-cach-nhiet",
      description: "Giải pháp mái tôn cách nhiệt và panel chống nóng (PU, PIR, EPS, Rockwool) giúp giảm nhiệt độ trong nhà xưởng, tiết kiệm điện năng làm mát và đảm bảo điều kiện sản xuất ổn định.",
      imageUrl: "/images/roof.png"
    },
    {
      title: "Sửa chữa mái tôn dột, rỉ sét",
      slug: "sua-chua-mai-ton-dot",
      description: "Mái tôn nhà xưởng thường xuống cấp nhanh do tác động của thời tiết, hơi nước công nghiệp. Khi gặp sự cố dột, rỉ sét, chúng tôi xử lý tận gốc bằng keo chuyên dụng và gia cố viền diềm.",
      imageUrl: "/images/hero.png"
    }
  ];

  for (const item of subServices) {
    await prisma.service.create({
      data: {
        title: item.title,
        slug: item.slug,
        description: item.description,
        imageUrl: item.imageUrl,
        parentId: parent.id,
        content: "<h2 class='text-2xl font-bold mb-4'>" + item.title + "</h2><p class='text-slate-700 leading-relaxed'>" + item.description + "</p>"
      }
    });
  }

  // Restore parent content to just the intro, removing the hardcoded grid
  const intro = `
      <p class="mb-8 text-slate-700 leading-relaxed text-lg font-medium">Mái tôn là hạng mục quan trọng ảnh hưởng trực tiếp đến tuổi thọ, môi trường sản xuất và chi phí vận hành nhà xưởng. Chúng tôi cung cấp các giải pháp toàn diện từ thay mới, sửa chữa, đến nâng cấp mái tôn với vật liệu hiện đại, quy trình chuyên nghiệp.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-slate-900 border-b pb-4">Giải pháp mái tôn & kết cấu mái nhà xưởng – Bền vững & Hiệu quả</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">SAMIN chuyên thay mới, sửa chữa, cải tạo và nâng cấp mái tôn công nghiệp cho nhà xưởng – đáp ứng tiêu chuẩn an toàn, cách nhiệt, chống dột.</p>
      <p class="mb-8 text-slate-700 leading-relaxed">Mái tôn là một trong những hạng mục quan trọng nhất của nhà xưởng. Một hệ mái tốt không chỉ đảm bảo sản xuất không bị gián đoạn do thấm dột, mà còn giúp giảm nhiệt độ, tiết kiệm năng lượng làm mát và kéo dài tuổi thọ công trình.</p>
  `;
  await prisma.service.update({
    where: { id: parent.id },
    data: { content: intro }
  });

  console.log("Seeded sub-services successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
