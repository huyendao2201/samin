'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10 bg-white p-10 rounded-3xl shadow-xl ring-1 ring-slate-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center font-bold text-3xl rounded-2xl shadow-lg mx-auto mb-6">
            S
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            SAMIN Admin
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Đăng nhập để vào bảng điều khiển quản trị
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="p-4 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email quản trị</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="admin@samin.vn"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="admin@samin.vn"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  defaultValue="admin"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full py-6 text-base rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all font-bold">
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
