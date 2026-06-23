import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PhoneCall } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (product) {
    return { title: `${product.name} - SAMIN` };
  }
  const category = await prisma.productCategory.findUnique({ where: { slug } });
  if (category) {
    return { title: `${category.name} - SAMIN` };
  }
  return { title: "Không tìm thấy - SAMIN" };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    const category = await prisma.productCategory.findUnique({ 
      where: { slug },
      include: { products: { where: { isActive: true } } }
    });

    if (category) {
      return (
        <article className="bg-slate-50 min-h-screen pb-24">
          <section className="relative pt-32 pb-24 bg-slate-900 text-center px-6">
            <Link href="/san-pham" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại tất cả sản phẩm
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">{category.name}</h1>
            {category.description && <p className="text-lg text-slate-300 max-w-2xl mx-auto">{category.description}</p>}
          </section>
          
          <section className="mx-auto max-w-7xl px-6 py-16 -mt-10 relative z-10">
             {category.products.length === 0 ? (
               <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-slate-100">
                 <p className="text-slate-500 text-lg">Hệ thống đang cập nhật sản phẩm cho danh mục này.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {category.products.map(p => (
                   <Link href={`/san-pham/${p.slug}`} key={p.id} className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all group flex flex-col">
                     <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                     <p className="text-slate-600 line-clamp-3 mb-6 flex-1">{p.description}</p>
                     <span className="text-sm font-semibold text-blue-600 flex items-center">Xem chi tiết <ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></span>
                   </Link>
                 ))}
               </div>
             )}
          </section>
        </article>
      );
    }
    notFound();
  }

  return (
    <article className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={product.imageUrl || "/images/roof.png"}
            alt={product.name}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Link href="/san-pham" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách sản phẩm
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div 
            className="prose prose-lg prose-blue max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:text-slate-900 prose-p:text-slate-700"
            dangerouslySetInnerHTML={{ __html: product.content || '' }}
          />

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100/50 mt-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 m-0 mb-2">Bạn cần báo giá vật tư?</h3>
              <p className="text-slate-600 m-0">SAMIN cung cấp giá tốt nhất từ nhà máy cho các đại lý và nhà thầu.</p>
            </div>
            <Link href="/lien-he" className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/30">
              <PhoneCall className="w-5 h-5" />
              Nhận báo giá ngay
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
