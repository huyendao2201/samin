'use client';

import { useTransition } from 'react';
import { deletePost } from '@/actions/post';
import { Loader2 } from 'lucide-react';

export default function DeletePostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => {
        if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
          startTransition(async () => {
            const formData = new FormData();
            formData.append('id', id);
            await deletePost(formData);
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
