import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PhoneCall, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  return {
    title: `${service?.title || slug} - SAMIN`,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ 
    where: { slug },
    include: { children: true }
  });

  if (!service) {
    notFound();
  }

  return (
    <article className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.imageUrl || "/images/steel.png"}
            alt={service.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Link href="/dich-vu" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách dịch vụ
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div 
            className="prose prose-lg prose-blue max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:text-slate-900 prose-p:text-slate-700"
            dangerouslySetInnerHTML={{ __html: service.content || '' }}
          />

          {service.children && service.children.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 border-b pb-4">Các dịch vụ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {service.children.map((child) => (
                  <Link href={`/dich-vu/${child.slug}`} key={child.id} className="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-full sm:w-2/5 shrink-0 overflow-hidden relative min-h-[160px] sm:min-h-0">
                      <Image 
                        src={child.imageUrl || "/images/roof.png"} 
                        alt={child.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-center sm:w-3/5">
                      <h3 className="text-lg font-bold text-blue-700 mb-2 leading-tight">{child.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-3">{child.description}</p>
                      <span className="text-sm font-semibold text-orange-500 inline-flex items-center group-hover:text-orange-600">
                        <ArrowRight className="w-4 h-4 mr-1" /> Xem thêm
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100/50 mt-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 m-0 mb-2">Bạn cần tư vấn ngay?</h3>
              <p className="text-slate-600 m-0">Đội ngũ kỹ sư SAMIN luôn sẵn sàng khảo sát miễn phí.</p>
            </div>
            <Link href="/lien-he" className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-600/30">
              <PhoneCall className="w-5 h-5" />
              Liên hệ khảo sát
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
