const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Cập nhật nội dung chi tiết...");

  const data = [
    {
      slug: "mai-ton-nha-xuong",
      title: "Dịch vụ mái tôn nhà xưởng",
      content: `
        <h2 class="text-3xl font-bold mt-8 mb-6 text-slate-900">Tại sao mái tôn nhà xưởng lại quan trọng?</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">Mái tôn là một trong những hạng mục quan trọng nhất của nhà xưởng. Một hệ mái tốt không chỉ đảm bảo sản xuất không bị gián đoạn do thấm dột, mà còn giúp giảm nhiệt độ, tiết kiệm điện năng làm mát và bảo vệ an toàn cho thiết bị, máy móc, hàng hóa bên trong.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div>
            <h3 class="text-2xl font-bold mb-4 text-slate-900">Giải pháp thi công toàn diện</h3>
            <p class="mb-4 text-slate-700 leading-relaxed">SAMIN cung cấp các giải pháp chuyên nghiệp từ thay mới, sửa chữa, đến nâng cấp mái tôn với vật liệu hiện đại. Chúng tôi cam kết sử dụng các loại tôn lợp chất lượng cao như tôn chống nóng 3 lớp PU, tôn seamlock, tôn cliplock.</p>
            <ul class="space-y-3 mt-6">
              <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><span class="text-slate-700 font-medium">Khảo sát, đo đạc và tư vấn miễn phí tận nơi.</span></li>
              <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><span class="text-slate-700 font-medium">Thi công thần tốc, không gián đoạn sản xuất.</span></li>
              <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><span class="text-slate-700 font-medium">Bảo hành chống dột lên đến 5 năm.</span></li>
            </ul>
          </div>
          <div class="relative h-64 md:h-auto rounded-3xl overflow-hidden shadow-xl">
             <img src="/images/roof.png" alt="Thi công mái tôn nhà xưởng" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900">Quy trình thực hiện chuẩn xác</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">Chúng tôi áp dụng quy trình thi công chuẩn an toàn & chất lượng: <br/><br/>
        <strong>Bước 1:</strong> Khảo sát hiện trạng & Lập phương án.<br/>
        <strong>Bước 2:</strong> Chuẩn bị vật tư & Lên biện pháp an toàn.<br/>
        <strong>Bước 3:</strong> Tháo dỡ (nếu có) & Lắp dựng tôn lợp mới.<br/>
        <strong>Bước 4:</strong> Hoàn thiện diềm, chống dột & Nghiệm thu.</p>
      `
    },
    {
      slug: "ket-cau-thep",
      title: "Thi công nhà xưởng kết cấu thép",
      content: `
        <h2 class="text-3xl font-bold mt-8 mb-6 text-slate-900">Nhà xưởng kết cấu thép tiền chế là gì?</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">Nhà xưởng kết cấu thép tiền chế là giải pháp xây dựng tối ưu nhất hiện nay cho các doanh nghiệp cần không gian rộng lớn để sản xuất, lưu trữ hàng hóa. Với ưu điểm thi công nhanh, nhịp thông thủy lớn, khả năng chịu lực cao và dễ dàng mở rộng, nhà xưởng kết cấu thép đang là sự lựa chọn số 1 của các khu công nghiệp.</p>
        <img src="/images/steel.png" alt="Thi công nhà xưởng kết cấu thép" class="rounded-3xl shadow-2xl my-10 w-full aspect-video object-cover" />
        <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900">Thế mạnh vượt trội của SAMIN</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">SAMIN tự hào là tổng thầu thiết kế và thi công nhà xưởng kết cấu thép uy tín. Chúng tôi sở hữu đội ngũ kỹ sư thiết kế dày dặn kinh nghiệm, nhà máy gia công cấu kiện thép tự động hóa và quy trình quản lý chất lượng thi công ngoài công trường vô cùng nghiêm ngặt.</p>
        <div class="bg-blue-50 p-8 rounded-3xl my-8">
          <ul class="space-y-4">
            <li class="flex items-center gap-4"><strong class="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">1</strong><span class="text-slate-800 font-medium text-lg">Thiết kế tối ưu, tiết kiệm đến 15% vật tư thép.</span></li>
            <li class="flex items-center gap-4"><strong class="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">2</strong><span class="text-slate-800 font-medium text-lg">Gia công chính xác tại xưởng, lắp dựng nhanh chóng tại công trường.</span></li>
            <li class="flex items-center gap-4"><strong class="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">3</strong><span class="text-slate-800 font-medium text-lg">Đảm bảo tuyệt đối tiến độ dự án và an toàn lao động.</span></li>
          </ul>
        </div>
      `
    },
    {
      slug: "nang-cap-cai-tao",
      title: "Nâng cấp & Cải tạo nhà xưởng",
      content: `
        <h2 class="text-3xl font-bold mt-8 mb-6 text-slate-900">Giải pháp Nâng cấp & Cải tạo toàn diện</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">Nhà xưởng sau nhiều năm hoạt động sẽ không tránh khỏi tình trạng xuống cấp hoặc không còn đáp ứng đủ quy mô sản xuất mới. Việc đập đi xây mới tốn kém rất nhiều chi phí và thời gian. SAMIN mang đến giải pháp Cải tạo, Nâng cấp, Mở rộng nhà xưởng trực tiếp trên nền móng cũ một cách an toàn và tiết kiệm nhất.</p>
        <img src="/images/about.png" alt="Cải tạo nhà xưởng" class="rounded-3xl shadow-2xl my-10 w-full aspect-video object-cover" />
        <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900">Các hạng mục cải tạo chính:</h2>
        <ul class="space-y-4 my-6 text-lg text-slate-700">
          <li class="flex items-start gap-3"><span class="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong>Gia cố kết cấu thép:</strong> Tăng khả năng chịu lực để lắp đặt thêm cẩu trục hoặc máy móc nặng.</span></li>
          <li class="flex items-start gap-3"><span class="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong>Mở rộng xưởng:</strong> Cơi nới thêm diện tích kho bãi, nối thêm nhịp nhà xưởng.</span></li>
          <li class="flex items-start gap-3"><span class="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong>Xử lý nền móng:</strong> Nâng nền, chống lún, làm lại bề mặt sàn epoxy.</span></li>
          <li class="flex items-start gap-3"><span class="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span><span><strong>Cải tạo hệ thống thông gió, chiếu sáng:</strong> Lắp đặt quả cầu hút nhiệt, lam gió, giếng trời polycarbonate.</span></li>
        </ul>
      `
    },
    {
      slug: "kho-lanh",
      title: "Kho lạnh & Công trình phụ trợ",
      content: `
        <h2 class="text-3xl font-bold mt-8 mb-6 text-slate-900">Thiết kế & Thi công Kho lạnh chuẩn GMP</h2>
        <p class="mb-6 text-slate-700 leading-relaxed text-lg">Kho lạnh là công trình không thể thiếu trong các nhà máy chế biến thực phẩm, thủy hải sản, nông sản hay kho dược phẩm. Một kho lạnh đạt chuẩn cần hệ thống panel cách nhiệt tuyệt đối, máy nén công suất phù hợp và khả năng vận hành ổn định 24/7.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 items-center">
          <div class="order-2 md:order-1 relative h-64 md:h-full rounded-3xl overflow-hidden shadow-xl">
             <img src="/images/hero.png" alt="Kho lạnh công nghiệp" class="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div class="order-1 md:order-2">
            <h3 class="text-2xl font-bold mb-4 text-slate-900">Hệ thống Panel EPS / PU chất lượng</h3>
            <p class="mb-4 text-slate-700 leading-relaxed">SAMIN chuyên thiết kế, lắp dựng Panel EPS, Panel PU chuyên dụng cho kho lạnh, kho mát. Chúng tôi thi công cực kỳ kín khít, hạn chế tối đa tình trạng thất thoát nhiệt năng, giúp máy nén hoạt động nhẹ nhàng và tiết kiệm điện.</p>
            <h3 class="text-2xl font-bold mt-8 mb-4 text-slate-900">Công trình phụ trợ</h3>
            <p class="mb-4 text-slate-700 leading-relaxed">Ngoài kho lạnh, chúng tôi còn thi công các công trình phụ trợ như: Văn phòng điều hành, nhà ăn công nhân, bãi xe nhà tiền chế, trạm cân điện tử, hệ thống xử lý nước thải.</p>
          </div>
        </div>
      `
    }
  ];

  for (const item of data) {
    await prisma.service.update({
      where: { slug: item.slug },
      data: { content: item.content }
    });
    console.log("Cập nhật:", item.slug);
  }

  console.log("Hoàn tất!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
