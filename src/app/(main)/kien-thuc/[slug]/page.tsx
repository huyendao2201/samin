import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  return {
    title: `${post?.title || slug.replace(/-/g, ' ')} - Kiến thức SAMIN`,
  };
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ 
    where: { slug },
    include: { category: true }
  });

  if (!post) {
    notFound();
  }
  return (
    <article className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/steel.png"
            alt="Chi tiết bài viết"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Link href="/kien-thuc" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Trở về danh sách bài viết
          </Link>
          <div className="flex items-center justify-center gap-4 text-slate-300 text-sm font-medium mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-500" /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-blue-500" /> SAMIN Admin</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 capitalize leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div 
            className="prose prose-lg prose-blue max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-headings:text-slate-900 prose-p:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>
      </section>
    </article>
  );
}
