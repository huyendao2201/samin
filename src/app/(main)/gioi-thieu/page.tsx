import { ShieldCheck, Users, Trophy, Target } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Giới thiệu - SAMIN Việt Nam",
  description: "Tìm hiểu về SAMIN - Chuyên gia cung cấp giải pháp nhà xưởng kết cấu thép hàng đầu tại Việt Nam.",
};

const stats = [];
const values = [];

export default async function AboutPage() {
  const aboutSetting = await prisma.setting.findUnique({ where: { key: 'about_content' } });
  
  // Default content
  let content = `
    <p>CÔNG TY SAMIN chuyên cung cấp giải pháp nhà xưởng kết cấu thép, mái tôn công nghiệp cho doanh nghiệp trong KCN, cơ sở tái chế – xuất, xưởng gia công và chế biến.</p>
    <p><br></p>
    <p>SAMIN đã thực hiện nhiều dự án từ Khánh Hòa, Bình Định trở vào phía Nam, đặc biệt tại Tây Nguyên, miền Tây và khu vực TP.HCM. Với phương châm "Xây chất lượng - Dựng niềm tin", chúng tôi luôn lấy sự hài lòng của khách hàng làm thước đo thành công.</p>
    <p><br></p>
    <p>Giải pháp thi công mới, nâng cấp, cải tạo và bảo trì nhà xưởng mọi quy mô của chúng tôi luôn đi kèm với chi phí cạnh tranh nhất. Từ dịch vụ mái tôn: thay mới, nâng cấp, chống nóng – chống dột cho xưởng đang hoạt động, đến các hạng mục kho lạnh, công trình phụ trợ.</p>
    <p><br></p>
    <p><strong>SAMIN – đồng hành cùng doanh nghiệp trong mọi công trình nhà xưởng.</strong></p>
  `;

  if (aboutSetting && aboutSetting.value) {
    content = aboutSetting.value;
  }

  return (
    <div className="bg-white">
      {/* Page Banner (Unified Dark Theme) */}
      <div className="relative bg-slate-900 py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/steel.png"
            alt="Giới thiệu SAMIN"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">CÂU CHUYỆN CỦA CHÚNG TÔI</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Về <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">SAMIN</span>
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Chuyên thiết kế – thi công – nâng cấp công trình kết cấu thép công nghiệp, cung cấp giải pháp toàn diện và bền vững cho mọi doanh nghiệp.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 sm:py-24">
        <div 
          className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
