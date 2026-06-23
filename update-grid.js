const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const gridHtml = `
    <h2 class="text-3xl font-bold mt-12 mb-8 text-slate-900 border-b pb-4">Các dịch vụ</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <!-- Item 1 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/roof.png" alt="Thay tôn vách bao che" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Thay tôn vách bao che, viền diềm</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">Việc thay tôn vách bao che và viền diềm là cần thiết khi mái tôn đã xuống cấp, có dấu hiệu gỉ sét, hoặc bị hư hỏng do thời tiết. Thay thế sớm giúp bảo vệ công trình khỏi dột, thấm dột, và tăng tính thẩm mỹ và là một công việc quan trọng để bảo vệ công trình.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>
      
      <!-- Item 2 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/hero.png" alt="Thay máng xối" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Thay máng xối, diềm úp nóc</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">SAMIN giúp bạn thay máng xối, diềm úp nóc; giúp bạn thay thế, sửa chữa máng xối và diềm úp nóc bị hư hỏng, đảm bảo hệ thống thoát nước của xưởng hoạt động hiệu quả, tránh các vấn đề như dột, thấm nước.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/steel.png" alt="Thay tôn sáng" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Thay tôn sáng</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">SAMIN sẽ thay thế các tấm lợp mái bằng tôn thông thường bằng các tấm tôn lấy sáng để tăng cường ánh sáng tự nhiên cho công trình. Thay tôn sáng bao gồm: Tháo dỡ mái tôn cũ, vệ sinh và lắp đặt tấm tôn Polycarbonate hoặc Composite cao cấp.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>

      <!-- Item 4 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/about.png" alt="Gia cường khung mái" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Gia cường khung mái, thay xà gồ thép</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">Dịch vụ gia cường khung mái và thay xà gồ thép giúp tăng khả năng chịu lực của mái nhà xưởng, đảm bảo an toàn khi sử dụng lâu dài. Chúng tôi thực hiện kiểm tra, hàn bổ sung, thay thế xà gồ hư hỏng và tối ưu khung chịu lực.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>

      <!-- Item 5 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/roof.png" alt="Mái tôn cách nhiệt" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Mái tôn cách nhiệt, panel chống nóng</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">Giải pháp mái tôn cách nhiệt và panel chống nóng (PU, PIR, EPS, Rockwool) giúp giảm nhiệt độ trong nhà xưởng, tiết kiệm điện năng làm mát và đảm bảo điều kiện sản xuất ổn định. Phù hợp cho nhà máy, kho lạnh và kho bảo quản.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>

      <!-- Item 6 -->
      <div class="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        <div class="w-full sm:w-2/5 shrink-0 overflow-hidden">
          <img src="/images/hero.png" alt="Sửa chữa mái tôn dột" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]" />
        </div>
        <div class="p-5 flex flex-col justify-center">
          <h3 class="text-lg font-bold text-blue-700 mb-2 leading-tight">Sửa chữa mái tôn dột, rỉ sét</h3>
          <p class="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-3">Mái tôn nhà xưởng thường xuống cấp nhanh do tác động của thời tiết, hơi nước công nghiệp, hoặc do lắp đặt ban đầu không đúng kỹ thuật. Khi gặp sự cố dột, rỉ sét, chúng tôi xử lý tận gốc bằng keo chuyên dụng và gia cố viền diềm.</p>
          <span class="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            Xem thêm
          </span>
        </div>
      </div>
    </div>
  `;

  // Prepend the grid to the existing content for 'mai-ton-nha-xuong'
  const service = await prisma.service.findUnique({ where: { slug: 'mai-ton-nha-xuong' } });
  
  // Clean up if it was already appended
  let newContent = service.content;
  if (!newContent.includes('Các dịch vụ')) {
    // Add intro text from image 2
    const intro = `
      <p class="mb-8 text-slate-700 leading-relaxed text-lg font-medium">Mái tôn là hạng mục quan trọng ảnh hưởng trực tiếp đến tuổi thọ, môi trường sản xuất và chi phí vận hành nhà xưởng. Chúng tôi cung cấp các giải pháp toàn diện từ thay mới, sửa chữa, đến nâng cấp mái tôn với vật liệu hiện đại, quy trình chuyên nghiệp.</p>
      <h2 class="text-3xl font-bold mt-10 mb-6 text-slate-900 border-b pb-4">Giải pháp mái tôn & kết cấu mái nhà xưởng – Bền vững & Hiệu quả</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">SAMIN chuyên thay mới, sửa chữa, cải tạo và nâng cấp mái tôn công nghiệp cho nhà xưởng – đáp ứng tiêu chuẩn an toàn, cách nhiệt, chống dột.</p>
      <p class="mb-8 text-slate-700 leading-relaxed">Mái tôn là một trong những hạng mục quan trọng nhất của nhà xưởng. Một hệ mái tốt không chỉ đảm bảo sản xuất không bị gián đoạn do thấm dột, mà còn giúp giảm nhiệt độ, tiết kiệm năng lượng làm mát và kéo dài tuổi thọ công trình. Đội ngũ kỹ sư và thợ thi công của chúng tôi có nhiều kinh nghiệm từ các công trình lớn, nay áp dụng quy trình chuẩn cho cả công trình vừa và nhỏ.</p>
    `;
    // Replace the first generated block with the correct intro + the grid, but keeping the "Tại sao mái tôn nhà xưởng lại quan trọng?" as an extra at the bottom
    newContent = intro + gridHtml;
    
    await prisma.service.update({
      where: { slug: 'mai-ton-nha-xuong' },
      data: { content: newContent }
    });
    console.log("Updated mai-ton-nha-xuong grid!");
  } else {
    console.log("Grid already exists.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
