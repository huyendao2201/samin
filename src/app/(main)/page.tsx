import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Wrench, Factory, Snowflake, MapPin, Banknote, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/home/HeroSlider";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const services = [
  {
    title: "Dịch vụ mái tôn nhà xưởng",
    description: "Chúng tôi chuyên thi công, thay mới và nâng cấp hệ thống mái tôn nhà xưởng công nghiệp, đảm bảo độ bền, khả năng chống dột – chống nóng và tối ưu chi phí vận hành.",
    icon: Building2,
    href: "/dich-vu/mai-ton-nha-xuong",
    image: "/images/roof.png"
  },
  {
    title: "Thi công nhà xưởng kết cấu thép",
    description: "Chúng tôi chuyên thiết kế và thi công nhà xưởng bằng kết cấu thép tiền chế, đáp ứng yêu cầu mở rộng sản xuất, kho bãi và các công trình công nghiệp.",
    icon: Factory,
    href: "/dich-vu/ket-cau-thep",
    image: "/images/steel.png"
  },
  {
    title: "Nâng cấp & Cải tạo nhà xưởng",
    description: "Chúng tôi chuyên cải tạo, nâng cấp nhà xưởng kết cấu thép hiện hữu, giúp doanh nghiệp mở rộng quy mô sản xuất và tối ưu công năng sử dụng mà không cần xây mới hoàn toàn.",
    icon: Wrench,
    href: "/dich-vu/nang-cap-cai-tao",
    image: "/images/about.png"
  },
  {
    title: "Kho lạnh & Công trình phụ trợ",
    description: "Chúng tôi cung cấp dịch vụ thiết kế, thi công kho lạnh và lắp đặt hệ thống panel cách nhiệt cho nhà xưởng, phù hợp cho doanh nghiệp chế biến, bảo quản nông sản, thủy sản và hàng hóa cần điều kiện nhiệt độ ổn định.",
    icon: Snowflake,
    href: "/dich-vu/kho-lanh",
    image: "/images/hero.png"
  },
];

const products = [
  {
    name: "Tôn lợp",
    href: "/san-pham/ton-lop",
    image: "/images/roof.png"
  },
  {
    name: "Inox - SUS",
    href: "/san-pham/inox-sus",
    image: "/images/hero.png"
  },
  {
    name: "Thép - Steel",
    href: "/san-pham/thep-steel",
    image: "/images/steel.png"
  },
  {
    name: "Kim loại tấm",
    href: "/san-pham/kim-loai-tam",
    image: "/images/about.png"
  }
];

const posts = [
  {
    title: "Nhôm định hình và ứng dụng thực tế",
    excerpt: "Nhôm định hình ra đời vào những năm cuối của thế kỷ 19 cùng với sự phát minh quá trình khử điện phân, giúp việc sản xuất nhôm hàng loạt trở nên khả thi...",
    href: "/kien-thuc/nhom-dinh-hinh-va-ung-dung-thuc-te",
    image: "/images/hero.png",
    date: "20/06/2026"
  },
  {
    title: "Quy trình Thi công Nhà xưởng Kết cấu thép chuẩn kỹ thuật",
    excerpt: "Thi công nhà xưởng kết cấu thép là quá trình đòi hỏi độ chính xác cao và tuân thủ nghiêm ngặt quy trình kỹ thuật. Với đặc thù tải trọng lớn...",
    href: "/kien-thuc/quy-trinh-thi-cong-nha-xuong-ket-cau-thep",
    image: "/images/steel.png",
    date: "18/06/2026"
  },
  {
    title: "Báo giá thi công nhà xưởng mới nhất năm nay",
    excerpt: "Trong bối cảnh ngành công nghiệp và sản xuất ngày càng phát triển, nhu cầu xây dựng nhà xưởng ngày càng tăng cao. Cùng tìm hiểu báo giá mới nhất...",
    href: "/kien-thuc/bao-gia-thi-cong-nha-xuong",
    image: "/images/roof.png",
    date: "15/06/2026"
  }
];

const jobs = [
  {
    title: "Tuyển dụng công nhân",
    location: "TP.HCM / Bình Dương",
    salary: "Thỏa thuận",
    type: "Toàn thời gian",
    href: "/tuyen-dung/cong-nhan"
  },
  {
    title: "Tuyển dụng nhân viên lễ tân",
    location: "TP.HCM",
    salary: "7 - 10 Triệu",
    type: "Toàn thời gian",
    href: "/tuyen-dung/nhan-vien-le-tan"
  },
  {
    title: "Tuyển dụng nhân viên bảo vệ",
    location: "TP.HCM",
    salary: "8 - 12 Triệu",
    type: "Toàn thời gian",
    href: "/tuyen-dung/nhan-vien-bao-ve"
  }
];

export default async function Home() {
  const settingSlider = await prisma.setting.findUnique({ where: { key: 'homepage_slider' } });
  let dynamicSlides = undefined;
  
  if (settingSlider && settingSlider.value) {
    try {
      const parsed = JSON.parse(settingSlider.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicSlides = parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <HeroSlider slides={dynamicSlides} />

      {/* Về SAMIN Section */}
      <section id="home-section-about" className="py-24 bg-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Giới thiệu về SAMIN
              </h2>
              <div className="text-lg leading-8 text-slate-600 space-y-6">
                <p>
                  <strong className="text-slate-900">CÔNG TY SAMIN</strong> chuyên cung cấp giải pháp nhà xưởng kết cấu thép, mái tôn công nghiệp cho doanh nghiệp trong KCN, cơ sở tái chế – xuất, xưởng gia công và chế biến.
                </p>
                <p>
                  SAMIN đã thực hiện nhiều dự án từ Khánh Hòa, Bình Định trở vào phía Nam, đặc biệt tại Tây Nguyên, miền Tây và khu vực TP.HCM.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Đội ngũ kỹ sư giàu kinh nghiệm, quy trình thi công chuẩn an toàn – chất lượng.</li>
                  <li>Giải pháp thi công mới, nâng cấp, cải tạo và bảo trì nhà xưởng mọi quy mô, chi phí cạnh tranh.</li>
                  <li>Dịch vụ mái tôn: thay mới, nâng cấp, chống nóng – chống dột cho xưởng đang hoạt động.</li>
                </ul>
                <p className="font-medium text-slate-900">
                  SAMIN – đồng hành cùng doanh nghiệp trong mọi công trình nhà xưởng.
                </p>
                <p>
                  Với đội ngũ kỹ thuật nhiều năm kinh nghiệm và hệ thống quy trình thi công – bảo trì đạt chuẩn, chúng tôi cam kết mang đến cho khách hàng những công trình bền vững, an toàn và hiệu quả chi phí.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/gioi-thieu">Xem thêm</Link>
                </Button>
              </div>
            </div>
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/about.png" 
                alt="Về SAMIN" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dịch vụ Section */}
      <section id="home-section-service" className="py-24 bg-slate-50 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Dịch vụ</h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow ring-1 ring-slate-200">
                <div className="relative w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-3 text-sm">{service.description}</p>
                  <div className="mt-auto">
                    <Link href={service.href} className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center">
                      Chi tiết <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              <Link href="/dich-vu">Xem Tất Cả</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sản phẩm & Vật tư Section */}
      <section id="home-section-product" className="py-24 bg-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Sản phẩm & Vật tư</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.name} href={product.href} className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-square">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tin tức & Kiến thức Section */}
      <section className="py-24 bg-slate-50 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Tin tức & Kiến thức</h2>
              <p className="text-lg text-slate-600">Cập nhật những thông tin mới nhất về kỹ thuật, quy trình thi công và báo giá ngành xây dựng nhà xưởng.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              <Link href="/kien-thuc">Xem tất cả bài viết <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.title} href={post.href} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all ring-1 ring-slate-200">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm flex-1">{post.excerpt}</p>
                  <div className="text-blue-600 font-medium text-sm flex items-center group-hover:gap-2 transition-all">
                    Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tuyển dụng Section */}
      <section className="py-24 bg-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Tuyển dụng</h2>
            <p className="text-lg text-slate-600">Gia nhập đội ngũ SAMIN để cùng kiến tạo những công trình nhà xưởng chất lượng hàng đầu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link key={job.title} href={job.href} className="block group p-6 rounded-3xl border border-slate-200 hover:border-blue-600 hover:shadow-lg transition-all bg-slate-50 hover:bg-white">
                <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-600 gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 gap-2">
                    <Banknote className="h-4 w-4 text-slate-400" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-semibold text-blue-600">Ứng tuyển ngay</span>
                  <div className="h-8 w-8 rounded-full bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="h-4 w-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              <Link href="/tuyen-dung">Xem tất cả vị trí</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Form Khảo sát & Tư vấn */}
      <section className="py-24 bg-slate-900 sm:py-32 relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/hero.png" alt="Background" fill className="object-cover opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">Khảo sát & tư vấn</h2>
              <p className="text-lg text-slate-300 mb-8">
                Để lại thông tin, đội ngũ kỹ sư của SAMIN sẽ liên hệ lại ngay để khảo sát và đưa ra giải pháp phù hợp nhất cho công trình của bạn.
              </p>
              <div className="flex items-center gap-4 text-white">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Gọi ngay Hotline</p>
                  <p className="text-2xl font-bold">0919 678 693</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">Họ tên *</label>
                  <input type="text" name="name" id="name" required className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900">Số điện thoại *</label>
                  <input type="tel" name="phone" id="phone" required className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold leading-6 text-slate-900">Dịch vụ quan tâm</label>
                  <select name="service" id="service" className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white">
                    <option value="mai-ton">Dịch vụ mái tôn nhà xưởng</option>
                    <option value="ket-cau-thep">Thi công nhà xưởng kết cấu thép</option>
                    <option value="nang-cap-cai-tao">Nâng cấp & Cải tạo nhà xưởng</option>
                    <option value="kho-lanh">Kho lạnh & Công trình phụ trợ</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">Nội dung *</label>
                  <textarea name="message" id="message" rows={4} required className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" defaultValue={""} />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">Gửi Yêu Cầu</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
