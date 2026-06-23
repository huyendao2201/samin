'use client';

import { useTransition } from 'react';
import { deleteJob } from '@/actions/job';
import { Loader2 } from 'lucide-react';

export default function DeleteJobButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => {
        if (confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
          startTransition(async () => {
            const formData = new FormData();
            formData.append('id', id);
            await deleteJob(formData);
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
