const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const content = `
<p>Trong bối cảnh các <strong>khu công nghiệp</strong> phát triển mạnh mẽ tại Việt Nam, nhu cầu về <strong>nhà xưởng kết cấu thép</strong> bền vững, an toàn, chi phí hợp lý và dễ mở rộng ngày càng tăng cao. Nhiều doanh nghiệp sản xuất, gia công, chế biến, tái chế - xuất đang tìm kiếm một <strong>đối tác lắp dựng uy tín</strong>, có khả năng triển khai giải pháp đồng bộ, từ thiết kế đến thi công và bảo trì lâu dài.</p>

<p><strong>CÔNG TY SAMIN</strong> ra đời để đáp ứng nhu cầu thực tiễn đó. Chúng tôi cung cấp giải pháp trọn gói, áp dụng <strong>quy trình quản lý – giám sát chuẩn mực dự án</strong> cho cả công trình vừa và nhỏ, đảm bảo an toàn, tiến độ và chất lượng, đồng thời tối ưu chi phí cho doanh nghiệp.</p>

<h2 id="cong-ty">Công ty lắp dựng SAMIN</h2>
<p>Mỗi công trình SAMIN thực hiện đều hướng đến giá trị bền vững, hiệu quả sản xuất cao và chi phí vận hành tối ưu. Chúng tôi đồng hành cùng doanh nghiệp trong mọi giai đoạn phát triển - từ khi <strong>xây dựng nhà xưởng</strong> mới, mở rộng quy mô đến cải tạo và bảo trì.</p>

<h2 id="pham-vi">Phạm vi hoạt động</h2>
<p>SAMIN đã triển khai nhiều dự án từ <strong>Khánh Hòa, Bình Định trở vào toàn miền Nam</strong>, đặc biệt tập trung tại:</p>
<ul>
  <li><strong>Tây Nguyên</strong> - nhà xưởng chế biến nông sản, kho bảo quản.</li>
  <li><strong>Miền Tây Nam Bộ</strong> - xưởng thủy sản, tái chế và xuất khẩu.</li>
  <li><strong>TP.HCM và các tỉnh lân cận</strong> - trung tâm khu công nghiệp lớn, nhu cầu mở rộng và cải tạo thường xuyên.</li>
</ul>

<h2 id="dich-vu">Dịch vụ & thế mạnh</h2>
<ul>
  <li><strong>Giải pháp trọn gói:</strong> khảo sát - tư vấn thiết kế - thi công mới - nâng cấp & cải tạo - bảo trì định kỳ.</li>
  <li><strong>Quy trình quản lý - giám sát chuyên nghiệp</strong>, vốn áp dụng cho các dự án lớn, được SAMIN đưa vào cả công trình vừa và nhỏ, đảm bảo an toàn - tiến độ - chất lượng.</li>
  <li><strong>Chi phí cạnh tranh</strong>, minh bạch, giúp tối ưu ngân sách cho doanh nghiệp.</li>
  <li><strong>Dịch vụ mái tôn:</strong> thay mới, nâng cấp, xử lý chống nóng - chống dột cho xưởng đang hoạt động.</li>
</ul>

<h2 id="tam-nhin">Tầm nhìn & Sứ mệnh</h2>
<ul>
  <li><strong>Tầm nhìn:</strong> Trở thành đơn vị lắp dựng công nghiệp đáng tin cậy hàng đầu tại khu vực phía Nam, bao gồm cả Nam Trung Bộ (Khánh Hòa, Bình Định), Tây Nguyên và miền Tây Nam Bộ.</li>
  <li><strong>Sứ mệnh:</strong> Giúp doanh nghiệp mở rộng sản xuất thuận lợi - tiết kiệm - an toàn, với công trình bền vững theo thời gian.</li>
</ul>
`;

async function run() {
  await prisma.setting.upsert({
    where: { key: 'about_content' },
    update: { value: content },
    create: { key: 'about_content', value: content }
  });
  console.log("Seeded clean about content successfully!");
}

run().finally(() => prisma.$disconnect());
