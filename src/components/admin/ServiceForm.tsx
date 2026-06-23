'use client';

import { saveService } from "@/actions/service";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? 'Đang lưu...' : 'Lưu Dịch vụ'}
    </button>
  );
}

export default function ServiceForm({ service, parents }: { service?: any, parents: any[] }) {
  const [content, setContent] = useState(service?.content || "");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/services" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {service ? "Chỉnh sửa Dịch vụ" : "Thêm Dịch vụ mới"}
        </h1>
      </div>

      <form action={saveService} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <input type="hidden" name="id" value={service?.id || ""} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tên dịch vụ <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="title" 
              defaultValue={service?.title || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Thi công mái tôn"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Đường dẫn (Slug) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="slug" 
              defaultValue={service?.slug || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: thi-cong-mai-ton"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Dịch vụ cha (Danh mục)</label>
            <select 
              name="parentId" 
              defaultValue={service?.parentId || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="">-- Không có (Thư mục gốc) --</option>
              {parents.filter(p => p.id !== service?.id).map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hình ảnh đại diện</label>
            <ImageUpload defaultValue={service?.imageUrl} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Mô tả ngắn</label>
          <textarea 
            name="description" 
            defaultValue={service?.description || ""} 
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            placeholder="Nhập mô tả ngắn gọn về dịch vụ..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nội dung chi tiết (Trình soạn thảo trực quan)</label>
          <input type="hidden" name="content" value={content} />
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
          <Link href="/admin/services" className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
            Hủy bỏ
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
