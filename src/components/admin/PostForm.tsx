'use client';

import { savePost } from "@/actions/post";
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
      {pending ? 'Đang lưu...' : 'Lưu Bài viết'}
    </button>
  );
}

export default function PostForm({ post, categories }: { post?: any, categories: any[] }) {
  const [content, setContent] = useState(post?.content || "");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/posts" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {post ? "Chỉnh sửa Bài viết" : "Thêm Bài viết mới"}
        </h1>
      </div>

      <form action={savePost} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <input type="hidden" name="id" value={post?.id || ""} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tiêu đề bài viết <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="title" 
              defaultValue={post?.title || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Quy trình thi công nhà xưởng..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Đường dẫn (Slug) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="slug" 
              defaultValue={post?.slug || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: quy-trinh-thi-cong-nha-xuong"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Danh mục (Category)</label>
            <select 
              name="categoryId" 
              defaultValue={post?.categoryId || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hình ảnh Cover (Ảnh bài viết)</label>
            <ImageUpload defaultValue={post?.imageUrl} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Tóm tắt ngắn (Excerpt)</label>
            <textarea 
              name="excerpt" 
              defaultValue={post?.excerpt || ""} 
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Vài dòng giới thiệu tóm tắt bài viết..."
            />
          </div>

          <div className="space-y-2 flex flex-col justify-center">
            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input 
                type="checkbox" 
                name="isPublished" 
                defaultChecked={post ? post.isPublished : true} 
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Hiển thị công khai (Publish)</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nội dung chi tiết (Rich Text)</label>
          <input type="hidden" name="content" value={content} />
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
          <Link href="/admin/posts" className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
            Hủy bỏ
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
