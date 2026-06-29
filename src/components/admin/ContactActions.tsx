'use client';

import { useTransition } from 'react';
import { updateContactStatus, deleteContact } from '@/actions/contact-admin';
import { Loader2, Trash2, CheckCircle } from 'lucide-react';

export default function ContactActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('status', newStatus);
      await updateContactStatus(formData);
    });
  };

  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('id', id);
        await deleteContact(formData);
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      ) : (
        <>
          <select 
            value={currentStatus}
            onChange={handleStatusChange}
            className="text-xs border border-slate-200 rounded p-1 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="NEW">Mới</option>
            <option value="IN_PROGRESS">Đang xử lý</option>
            <option value="RESOLVED">Đã giải quyết</option>
          </select>
          <button 
            onClick={handleDelete}
            title="Xóa liên hệ"
            className="text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
