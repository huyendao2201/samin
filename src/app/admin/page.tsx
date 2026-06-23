import { Users, FileText, Wrench, ArrowUpRight, MessageSquareText } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const contactCount = await prisma.contact.count({ where: { status: 'NEW' } });
  const postCount = await prisma.post.count();
  const serviceCount = await prisma.service.count();

  const recentContacts = await prisma.contact.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { name: 'Yêu cầu liên hệ mới', value: contactCount.toString(), icon: MessageSquareText, trend: 'Cập nhật', color: 'bg-blue-500' },
    { name: 'Bài viết kiến thức', value: postCount.toString(), icon: FileText, trend: 'Tổng cộng', color: 'bg-emerald-500' },
    { name: 'Dịch vụ cung cấp', value: serviceCount.toString(), icon: Wrench, trend: 'Đang hoạt động', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tổng quan hệ thống</h1>
        <p className="mt-2 text-slate-600">Chào mừng bạn quay trở lại. Dưới đây là tóm tắt hoạt động của website SAMIN.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${stat.color} shadow-md`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                {stat.trend} <ArrowUpRight className="ml-1 w-3 h-3" />
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">{stat.name}</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-2">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Khách hàng liên hệ gần đây</h3>
          <Link href="/admin/contacts" className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
            Xem tất cả
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 py-16 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <Users className="w-8 h-8 text-slate-300" />
            </div>
            <p className="font-medium">Chưa có dữ liệu liên hệ nào. Hệ thống sẽ tự động cập nhật khi khách hàng điền form trên website.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-slate-700 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Số điện thoại</th>
                <th className="px-6 py-4">Dịch vụ</th>
                <th className="px-6 py-4">Ngày gửi</th>
                <th className="px-6 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentContacts.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                  <td className="px-6 py-4">{c.phone}</td>
                  <td className="px-6 py-4 truncate max-w-[150px]">{c.service}</td>
                  <td className="px-6 py-4">{new Date(c.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${c.status === 'NEW' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'}`}>
                      {c.status === 'NEW' ? 'Mới' : c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
