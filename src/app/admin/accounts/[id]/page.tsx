import UserForm from '@/components/admin/UserForm';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/actions/auth';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditAccountPage({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN') {
    redirect('/admin');
  }

  const { id } = await params;
  const userToEdit = await prisma.user.findUnique({
    where: { id }
  });

  if (!userToEdit) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Cập nhật tài khoản</h1>
      </div>
      <UserForm user={userToEdit} />
    </div>
  );
}
