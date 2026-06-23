'use client';

import { saveProduct } from "@/actions/product";
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
      {pending ? 'Đang lưu...' : 'Lưu Sản phẩm'}
    </button>
  );
}

export default function ProductForm({ product, categories }: { product?: any, categories: any[] }) {
  const [content, setContent] = useState(product?.content || "");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">
          {product ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm mới"}
        </h1>
      </div>

      <form action={saveProduct} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <input type="hidden" name="id" value={product?.id || ""} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tên sản phẩm / Vật tư <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name" 
              defaultValue={product?.name || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: Tôn cách nhiệt 3 lớp"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Đường dẫn (Slug) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="slug" 
              defaultValue={product?.slug || ""} 
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="VD: ton-cach-nhiet-3-lop"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Danh mục (Category)</label>
            <select 
              name="categoryId" 
              defaultValue={product?.categoryId || ""}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hình ảnh sản phẩm</label>
            <ImageUpload defaultValue={product?.imageUrl} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Mô tả ngắn</label>
            <textarea 
              name="description" 
              defaultValue={product?.description || ""} 
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Vài dòng giới thiệu tóm tắt sản phẩm..."
            />
          </div>

          <div className="space-y-2 flex flex-col justify-center">
            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input 
                type="checkbox" 
                name="isActive" 
                defaultChecked={product ? product.isActive : true} 
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Hiển thị trên website</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Thông số kỹ thuật & Chi tiết (Rich Text)</label>
          <input type="hidden" name="content" value={content} />
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
          <Link href="/admin/products" className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors">
            Hủy bỏ
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
