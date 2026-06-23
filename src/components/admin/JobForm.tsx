'use client';

import { saveJob } from "@/actions/job";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? 'Đang lưu...' : 'Lưu Tuyển dụng'}
    </button>
  );
}

export default function JobForm({ job }: { job?: any }) {
  const [description, setDescription] = useState(job?.description || "");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/jobs" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {job ? "Chỉnh sửa Tuyển dụng" : "Thêm Tuyển dụng mới"}
        </h1>
      </div>

      <form action={saveJob} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <input type="hidden" name="id" value={job?.id || ""} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tiêu đề (Vị trí) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="title" 
              defaultValue={job?.title || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Kỹ sư xây dựng"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Đường dẫn (Slug) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="slug" 
              defaultValue={job?.slug || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: ky-su-xay-dung"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phòng ban</label>
            <input 
              type="text" 
              name="department" 
              defaultValue={job?.department || ""} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Phòng Kỹ Thuật"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Địa điểm</label>
            <input 
              type="text" 
              name="location" 
              defaultValue={job?.location || ""} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: TP.HCM"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Loại hình</label>
            <input 
              type="text" 
              name="type" 
              defaultValue={job?.type || ""} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Toàn thời gian"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mức lương</label>
            <input 
              type="text" 
              name="salary" 
              defaultValue={job?.salary || ""} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: 15 - 20 Triệu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hạn nộp hồ sơ</label>
            <input 
              type="text" 
              name="deadline" 
              defaultValue={job?.deadline || ""} 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: 30/07/2026"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-center">
            <label className="flex items-center gap-3 cursor-pointer mt-8">
              <input 
                type="checkbox" 
                name="isActive" 
                defaultChecked={job ? job.isActive : true} 
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Đang tuyển dụng (Hiển thị)</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nội dung chi tiết (Mô tả, Yêu cầu, Quyền lợi)</label>
          <input type="hidden" name="description" value={description} />
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
          <Link href="/admin/jobs" className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
            Hủy bỏ
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
