import { ArrowRight, Box, Layers, Construction, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sản phẩm & Vật tư - SAMIN Việt Nam",
  description: "Cung cấp Tôn lợp, Inox - SUS, Thép - Steel chất lượng cao cho công trình công nghiệp.",
};

export const dynamic = 'force-dynamic';

function getIconForSlug(slug: string) {
  if (slug.includes('ton')) return Layers;
  if (slug.includes('inox')) return Box;
  if (slug.includes('thep')) return Construction;
  return Package;
}

export default async function ProductsPage() {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: {
        where: { isActive: true },
        orderBy: { createdAt: 'asc' }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  const activeCategories = categories.filter(c => c.products.length > 0);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-slate-900 py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/steel.png"
            alt="Sản phẩm SAMIN"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">Vật Tư Chất Lượng Cao</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Danh Mục <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sản Phẩm</span>
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              SAMIN trực tiếp cung cấp các loại vật tư kim loại chuyên dụng cho ngành xây dựng công nghiệp, đảm bảo nguồn gốc xuất xứ và tiêu chuẩn kiểm định nghiêm ngặt.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 bg-slate-50/50 space-y-24">
        {activeCategories.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-xl">Hệ thống đang cập nhật sản phẩm.</p>
          </div>
        ) : (
          activeCategories.map((category) => (
            <div key={category.id} className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-3xl font-bold text-slate-900">{category.name}</h3>
                {category.description && <p className="mt-2 text-lg text-slate-600">{category.description}</p>}
              </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.products.map((product) => {
                    const IconComponent = getIconForSlug(product.slug);
                    return (
                      <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-2xl hover:ring-blue-500 hover:-translate-y-2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                           <Image 
                             src={product.imageUrl || "/images/roof.png"}
                             alt={product.name}
                             fill
                             className="object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm border border-white/20">
                             SAMIN
                           </div>
                        </div>
                        
                        <div className="flex flex-col flex-1 p-6">
                          <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                            <Link href={`/san-pham/${product.slug}`}>
                              <span className="absolute inset-0 z-10" />
                              {product.name}
                            </Link>
                          </h4>
                          <p className="text-sm leading-relaxed text-slate-600 flex-1 line-clamp-3 mb-6">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                            <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">Xem thông số</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                               <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          ))
        )}

        {/* CTA Section */}
        <div className="relative mt-32 rounded-3xl overflow-hidden px-6 py-16 sm:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-blue-600"></div>
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.400),theme(colors.blue.600))] opacity-50"></div>
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Bạn cần báo giá vật tư?</h2>
            <p className="mt-6 text-lg text-blue-100">
              Liên hệ ngay với chúng tôi để nhận bảng báo giá chi tiết và ưu đãi tốt nhất cho dự án của bạn.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 shadow-lg hover:-translate-y-1 transition-transform" asChild>
                <Link href="/lien-he">Nhận báo giá</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/40 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-md shadow-lg hover:-translate-y-1 transition-transform" asChild>
                <a href="tel:0919678693">Gọi Hotline</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
