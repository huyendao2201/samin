import { ArrowRight, Building2, Factory, Wrench, Snowflake, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dịch vụ - SAMIN Việt Nam",
  description: "Các dịch vụ chính của SAMIN: Mái tôn nhà xưởng, Thi công kết cấu thép, Nâng cấp cải tạo và Kho lạnh.",
};

export const dynamic = 'force-dynamic';

function getIconForSlug(slug: string) {
  if (slug.includes('mai-ton')) return Building2;
  if (slug.includes('ket-cau-thep')) return Factory;
  if (slug.includes('kho-lanh')) return Snowflake;
  if (slug.includes('nang-cap')) return Wrench;
  return Shield;
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/hero.png" alt="Dịch vụ SAMIN" fill className="object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-widest">Dịch Vụ Chuyên Nghiệp</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-md">
              Giải Pháp Hoàn Hảo Cho Công Trình Của Bạn
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              SAMIN cung cấp các giải pháp xây dựng, cải tạo và bảo trì chuyên nghiệp, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất trong ngành kết cấu thép và nhà xưởng công nghiệp.
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {services.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-xl">Hệ thống đang cập nhật dịch vụ.</p>
            </div>
          ) : (
            <div className="space-y-24 lg:space-y-32">
              {services.map((service, index) => {
                const IconComponent = getIconForSlug(service.slug);
                return (
                  <div
                    key={service.id}
                    className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center group ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-full lg:w-1/2 flex justify-center">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                        <Image 
                          src={service.imageUrl || "/images/hero.png"} 
                          alt={service.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-3xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 group-hover:bg-blue-600 transition-colors duration-500 shadow-sm">
                          <IconComponent className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-500" aria-hidden="true" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                      </div>
                      <p className="text-lg text-slate-600 mb-8 leading-8">{service.description}</p>
                      <div>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-xl transition-all hover:-translate-y-1" asChild>
                          <Link href={`/dich-vu/${service.slug}`}>
                            Chi tiết dịch vụ <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
