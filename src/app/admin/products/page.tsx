import { Search, Plus } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Quản lý Sản phẩm & Vật tư</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm sản phẩm..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64" />
          </div>
          <Link href="/admin/products/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-slate-700 font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Hình ảnh</th>
              <th className="px-6 py-4">Tên sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có sản phẩm nào.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                       <Image src={product.imageUrl || "/images/roof.png"} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                  <td className="px-6 py-4">
                    {product.category?.name ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">{product.category.name}</span>
                    ) : (
                       <span className="text-slate-400 text-xs">Chưa phân loại</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.isActive ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">Hiển thị</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">Đã ẩn</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</Link>
                      <DeleteProductButton id={product.id} />
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
