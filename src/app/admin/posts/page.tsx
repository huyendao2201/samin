import { Search, Plus } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeletePostButton from '@/components/admin/DeletePostButton';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Quản lý Tin tức & Kiến thức</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm bài viết..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64" />
          </div>
          <Link href="/admin/posts/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
            <Plus className="h-4 w-4" /> Thêm bài viết
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-slate-700 font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Tiêu đề</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Ngày đăng</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có bài viết nào.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 truncate max-w-[300px]">{post.title}</td>
                  <td className="px-6 py-4">
                    {post.category?.name ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">{post.category.name}</span>
                    ) : (
                       <span className="text-slate-400 text-xs">Chưa phân loại</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    {post.isPublished ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">Đã xuất bản</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">Bản nháp</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</Link>
                      <DeletePostButton id={post.id} />
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
