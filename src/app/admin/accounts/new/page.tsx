import UserForm from '@/components/admin/UserForm';
import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewAccountPage() {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN') {
    redirect('/admin');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Thêm tài khoản mới</h1>
      </div>
      <UserForm />
    </div>
  );
}
