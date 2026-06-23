import { Search, MoreVertical, Plus } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    include: { parent: true },
    orderBy: [
      { parentId: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Quản lý Dịch vụ</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm dịch vụ..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64" />
          </div>
          <Link href="/admin/services/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
            <Plus className="h-4 w-4" /> Thêm dịch vụ
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-slate-700 font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Tên dịch vụ</th>
              <th className="px-6 py-4">Cấp độ (Danh mục)</th>
              <th className="px-6 py-4">Đường dẫn (Slug)</th>
              <th className="px-6 py-4">Mô tả ngắn</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Chưa có dịch vụ nào.</td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{service.title}</td>
                  <td className="px-6 py-4">
                    {service.parent ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        ↳ {service.parent.title}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        Thư mục gốc (Cha)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">/{service.slug}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{service.description || 'Không có mô tả'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/services/${service.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</Link>
                      <DeleteButton id={service.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
