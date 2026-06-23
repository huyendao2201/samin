import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tuyển dụng - SAMIN Việt Nam",
  description: "Gia nhập đội ngũ chuyên gia tại SAMIN. Chúng tôi luôn tìm kiếm những nhân tài đam mê ngành xây dựng công nghiệp.",
};

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Tuyển dụng SAMIN"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-8 backdrop-blur-md">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Cơ Hội Nghề Nghiệp</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Gia Nhập Đội Ngũ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">SAMIN</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Chúng tôi luôn chào đón những nhân tài đam mê, nhiệt huyết và muốn kiến tạo những công trình công nghiệp bền vững cùng SAMIN.
          </p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="mx-auto max-w-5xl px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 md:p-10">
          <div className="mb-10 border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Vị trí đang tuyển</h2>
              <p className="text-slate-500 mt-2">Cập nhật mới nhất tháng 6/2026</p>
            </div>
            <div>
              <span className="bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-xl text-sm inline-block">
                {jobs.length} vị trí trống
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {job.department}
                      </span>
                      <span className="flex items-center text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 mr-1.5" /> Hạn: {job.deadline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors relative z-10">
                      <Link href={`/tuyen-dung/${job.slug}`} className="before:absolute before:-inset-6 before:z-0">
                        {job.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-600 relative z-10 pointer-events-none">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-emerald-600">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className="md:border-l md:border-slate-100 md:pl-6 flex items-center shrink-0 relative z-20">
                    <Link href={`/tuyen-dung/${job.slug}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:scale-105 transition-all">
                      Ứng tuyển ngay
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
