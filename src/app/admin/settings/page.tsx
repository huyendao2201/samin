import prisma from '@/lib/prisma';
import SettingsForm from '@/components/admin/SettingsForm';
import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const dbSettings = await prisma.setting.findMany();
  
  // Chuyển array thành object để dễ truyền vào form
  const settingsObj = dbSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Cài đặt Website</h1>
      </div>
      <p className="text-slate-600">Thay đổi các thông tin hiển thị cứng trên trang chủ, footer và thông tin liên hệ tại đây.</p>
      
      <SettingsForm settings={settingsObj} />
    </div>
  );
}
