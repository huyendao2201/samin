import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import DeleteUserButton from '@/components/admin/DeleteUserButton';

export const dynamic = 'force-dynamic';

export default async function AccountsPage() {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN') {
    redirect('/admin');
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Quản lý Tài khoản</h1>
        <Link href="/admin/accounts/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm active:scale-95">
          <Plus className="h-5 w-5" />
          Thêm tài khoản
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-slate-700 font-medium border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Tên</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Quyền hạn (Role)</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{user.name || 'Không có tên'}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/accounts/${user.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</Link>
                    {user.id !== currentUser.id && (
                      <DeleteUserButton id={user.id} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
