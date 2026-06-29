'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveUser } from '@/actions/user';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function UserForm({ user }: { user?: any }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      if (user?.id) {
        formData.append('id', user.id);
      }
      
      const password = formData.get('password') as string;
      if (!user?.id && !password) {
        setError('Mật khẩu là bắt buộc khi tạo tài khoản mới.');
        setIsPending(false);
        return;
      }

      await saveUser(formData);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra.');
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tên người dùng</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={user?.name || ''} 
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email đăng nhập</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={user?.email || ''} 
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Mật khẩu {user && '(Để trống nếu không muốn đổi)'}
          </label>
          <input 
            type="password" 
            name="password" 
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            {...(!user && { required: true })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Quyền hạn (Role)</label>
          <select 
            name="role" 
            defaultValue={user?.role || 'EDITOR'} 
            className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="EDITOR">Quản trị viên (EDITOR)</option>
            <option value="ADMIN">Administrator (ADMIN)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
        <Link href="/admin/accounts" className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm">
          Hủy bỏ
        </Link>
        <button 
          type="submit" 
          disabled={isPending}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {user ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
}
