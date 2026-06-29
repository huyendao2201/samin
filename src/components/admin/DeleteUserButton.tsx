'use client';

import { useTransition } from 'react';
import { deleteUser } from '@/actions/user';
import { Loader2 } from 'lucide-react';

export default function DeleteUserButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => {
        if (confirm("Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.")) {
          startTransition(async () => {
            const formData = new FormData();
            formData.append('id', id);
            await deleteUser(formData);
          });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
    >
      {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
      {isPending ? 'Đang xóa...' : 'Xóa'}
    </button>
  );
}
