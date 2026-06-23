import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, DollarSign, Clock, Send } from "lucide-react";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug } });
  return {
    title: `Tuyển dụng: ${job?.title || slug.replace(/-/g, ' ')} - SAMIN`,
  };
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) {
    notFound();
  }
  return (
    <article className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Chi tiết Tuyển dụng"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Link href="/tuyen-dung" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Trở về danh sách tuyển dụng
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 capitalize leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-300">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"><MapPin className="w-4 h-4 text-emerald-400"/> {job.location}</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"><DollarSign className="w-4 h-4 text-yellow-400"/> {job.salary}</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"><Clock className="w-4 h-4 text-blue-400"/> Hạn nộp: {job.deadline}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="prose prose-lg prose-blue max-w-none text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: job.description || '' }} />


            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <h3 className="text-2xl font-bold text-white m-0 mb-2">Sẵn sàng gia nhập SAMIN?</h3>
                <p className="text-slate-400 m-0">Gửi CV ứng tuyển trực tiếp qua email tuyển dụng của chúng tôi.</p>
              </div>
              <a href="mailto:tuyendung@samin.vn" className="shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-600/30">
                <Send className="w-5 h-5" />
                Gửi hồ sơ ngay
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
