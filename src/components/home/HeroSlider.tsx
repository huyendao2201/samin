'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const defaultSlides = [
  {
    id: 1,
    title: "Giải pháp Nhà Xưởng & Kết Cấu Thép",
    subtitle: "Hàng Đầu",
    description: "CÔNG TY SAMIN chuyên cung cấp giải pháp nhà xưởng kết cấu thép cho doanh nghiệp, cơ sở gia công và chế biến. Cam kết mang đến công trình bền vững, an toàn và hiệu quả.",
    image: "/images/hero.png",
    primaryButton: "Nhận báo giá ngay",
    primaryLink: "/lien-he",
    secondaryButton: "Tìm hiểu thêm",
    secondaryLink: "/gioi-thieu",
  },
  {
    id: 2,
    title: "Thi Công Mái Tôn Công Nghiệp",
    subtitle: "Chuyên Nghiệp",
    description: "Khắc phục triệt để tình trạng dột nước, cách nhiệt kém. Chúng tôi cung cấp giải pháp mái tôn bền vững, bảo hành dài hạn cho các nhà xưởng quy mô lớn.",
    image: "/images/roof.png",
    primaryButton: "Xem dịch vụ mái tôn",
    primaryLink: "/dich-vu/mai-ton-nha-xuong",
    secondaryButton: "Tư vấn ngay",
    secondaryLink: "/lien-he",
  },
  {
    id: 3,
    title: "Nâng Cấp & Cải Tạo Nhà Xưởng",
    subtitle: "Tối Ưu Chi Phí",
    description: "Mở rộng quy mô sản xuất và tối ưu công năng sử dụng mà không cần xây mới hoàn toàn. Cải tạo hệ thống thông gió, vách ngăn và nền xưởng.",
    image: "/images/about.png",
    primaryButton: "Khám phá giải pháp",
    primaryLink: "/dich-vu/nang-cap-cai-tao",
    secondaryButton: "Liên hệ khảo sát",
    secondaryLink: "/lien-he",
  },
];

export function HeroSlider({ slides = defaultSlides }: { slides?: any[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );
  const fadePlugin = React.useRef(Fade());

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <Carousel
        plugins={[plugin.current, fadePlugin.current]}
        className="w-full h-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, idx) => (
            <CarouselItem key={slide.id || idx} className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full pl-0">
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image || "/images/hero.png"}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={slide.id === 1 || idx === 0}
                />
                <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              </div>
              
              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 drop-shadow-sm">
                    {slide.title} <br className="hidden sm:block" />
                    <span className="text-blue-400">{slide.subtitle}</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-slate-200 font-medium">
                    {slide.description}
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href={slide.primaryLink || "/lien-he"}>
                        {slide.primaryButton || "Nhận báo giá ngay"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white" asChild>
                      <Link href={slide.secondaryLink || "/gioi-thieu"}>{slide.secondaryButton || "Tìm hiểu thêm"}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 z-20 pointer-events-none hidden md:flex">
          <CarouselPrevious className="relative inset-auto translate-y-0 h-14 w-14 pointer-events-auto bg-white/10 hover:bg-blue-600 border-white/20 text-white hover:text-white backdrop-blur-md transition-colors shadow-xl hover:scale-110 duration-300" />
          <CarouselNext className="relative inset-auto translate-y-0 h-14 w-14 pointer-events-auto bg-white/10 hover:bg-blue-600 border-white/20 text-white hover:text-white backdrop-blur-md transition-colors shadow-xl hover:scale-110 duration-300" />
        </div>
      </Carousel>
    </section>
  );
}
