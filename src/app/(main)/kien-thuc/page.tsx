import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Kiến thức - SAMIN Việt Nam",
  description: "Chia sẻ kiến thức, kinh nghiệm và tin tức mới nhất về ngành xây dựng nhà xưởng, kết cấu thép và mái tôn.",
};

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function KnowledgePage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/steel.png"
            alt="Kiến thức SAMIN"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-8 backdrop-blur-md">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Góc Chuyên Gia</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Kiến Thức & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Kinh Nghiệm</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Tổng hợp các bài viết chuyên sâu về kỹ thuật thi công, xu hướng vật liệu và giải pháp tối ưu cho công trình công nghiệp hiện đại.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
              <Link href={`/kien-thuc/${post.slug}`} className="relative w-full aspect-[4/3] overflow-hidden block">
                <Image
                  src={post.imageUrl || "/images/steel.png"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                    {post.category?.name || "Kiến thức"}
                  </span>
                </div>
              </Link>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-x-4 text-xs font-medium text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-500" />
                    SAMIN
                  </div>
                </div>
                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-4">
                  <Link href={`/kien-thuc/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 mb-6 flex-1">
                  {post.excerpt}
                </p>
                <Link href={`/kien-thuc/${post.slug}`} className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-auto w-fit">
                  Đọc tiếp 
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
