'use client';

import { useState } from 'react';
import { UploadCloud, Loader2, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function ImageUpload({ defaultValue = "", name = "imageUrl", onChange }: { defaultValue?: string, name?: string, onChange?: (url: string) => void }) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn một file hình ảnh (JPG, PNG, WebP...)');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.url);
        if (onChange) onChange(data.url);
      } else {
        setError(data.error || 'Tải ảnh lên thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setImageUrl('');
    if (onChange) onChange('');
  };

  return (
    <div className="w-full">
      <input type="hidden" name={name} value={imageUrl} />
      
      {imageUrl ? (
        <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
          <Image src={imageUrl} alt="Uploaded" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button" 
              onClick={handleRemove}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Xóa ảnh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full max-w-sm h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          isUploading ? 'bg-slate-50 border-slate-300' : 'bg-slate-50 border-slate-300 hover:bg-blue-50 hover:border-blue-400'
        }`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 mb-3 text-blue-500 animate-spin" />
                <p className="mb-2 text-sm font-medium text-slate-600">Đang tải ảnh lên...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 mb-3 text-slate-400" />
                <p className="mb-2 text-sm font-medium">
                  <span className="text-blue-600">Bấm để chọn</span> hoặc kéo thả ảnh
                </p>
                <p className="text-xs text-slate-400">PNG, JPG, WebP (Tối đa 5MB)</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
}
