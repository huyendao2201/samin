import Link from 'next/link';
import { Building2, LayoutDashboard, FileText, Wrench, Briefcase, Users, LogOut, Settings as SettingsIcon, UserCog } from 'lucide-react';
import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

const sidebarLinks = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Liên hệ khách hàng', href: '/admin/contacts', icon: Users, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Quản lý Dịch vụ', href: '/admin/services', icon: Wrench, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Quản lý Sản phẩm', href: '/admin/products', icon: Building2, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Tin tức & Kiến thức', href: '/admin/posts', icon: FileText, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Tuyển dụng', href: '/admin/jobs', icon: Briefcase, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Cài đặt Website', href: '/admin/settings', icon: SettingsIcon, roles: ['ADMIN', 'EDITOR'] },
  { name: 'Quản lý Tài khoản', href: '/admin/accounts', icon: UserCog, roles: ['ADMIN'] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const roleName = user.role === 'ADMIN' ? 'Administrator' : 'Quản trị viên';
  const roleDesc = user.role === 'ADMIN' ? 'Quản trị viên tối cao' : 'Quản lý nội dung';

  const visibleLinks = sidebarLinks.filter(link => link.roles.includes(user.role));

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r bg-white flex flex-col shadow-sm relative z-10">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-lg mr-3 shadow-sm">
            S
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">SAMIN Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
          {visibleLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t bg-slate-50/50">
          <form action={async () => {
            'use server';
            const { logout } = await import('@/actions/auth');
            await logout();
          }}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all">
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b bg-white shadow-sm relative z-0">
          <h2 className="text-xl font-bold text-slate-800">Bảng điều khiển quản trị</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">{user.name || roleName}</p>
              <p className="text-xs text-slate-500">{roleDesc}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : (user.role === 'ADMIN' ? 'A' : 'E')}
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
