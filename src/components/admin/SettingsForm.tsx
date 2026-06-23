'use client';

import { useState, useEffect } from 'react';
import { saveSettings } from '@/actions/setting';
import { Loader2, Save, Plus, Trash2, CheckCircle } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Slider State
  const initialSlider = settings.homepage_slider ? JSON.parse(settings.homepage_slider) : [
    { title: '', description: '', image: '' }
  ];
  const [slider, setSlider] = useState<{title: string, description: string, image: string}[]>(initialSlider);

  const addSlide = () => setSlider([...slider, { title: '', description: '', image: '' }]);
  const removeSlide = (index: number) => setSlider(slider.filter((_, i) => i !== index));
  const updateSlide = (index: number, field: string, value: string) => {
    const newSlider = [...slider];
    newSlider[index] = { ...newSlider[index], [field]: value };
    setSlider(newSlider);
  };

  const [aboutContent, setAboutContent] = useState(settings.about_content || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    formData.append('homepage_slider', JSON.stringify(slider));
    formData.append('about_content', aboutContent);
    
    await saveSettings(formData);
    
    setIsSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Thông tin chung */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Thông tin chung (Liên hệ & Footer)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 block mb-2">Logo công ty</label>
            <ImageUpload defaultValue={settings.site_logo} name="site_logo" />
            <p className="text-xs text-slate-500 mt-2">Nên dùng ảnh PNG có nền trong suốt. Kích thước khuyến nghị: cao 60px.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tên Website / Công ty</label>
            <input name="site_name" defaultValue={settings.site_name || "SAMIN Việt Nam"} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Số điện thoại Hotline</label>
            <input name="contact_phone" defaultValue={settings.contact_phone || "0919 678 693"} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Địa chỉ Email</label>
            <input name="contact_email" defaultValue={settings.contact_email || "info@samin.vn"} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Địa chỉ văn phòng</label>
            <input name="contact_address" defaultValue={settings.contact_address || "354/89/16 Phan Văn Trị, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh"} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Link Facebook</label>
            <input name="facebook_url" defaultValue={settings.facebook_url || ""} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Link Zalo</label>
            <input name="zalo_url" defaultValue={settings.zalo_url || ""} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://zalo.me/..." />
          </div>
        </div>
      </div>

      {/* Banner / Slider Trang chủ */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Slider Trang chủ (Banner)</h2>
          <button type="button" onClick={addSlide} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
            <Plus className="w-4 h-4" /> Thêm Slide
          </button>
        </div>
        
        <div className="space-y-6">
          {slider.map((slide, index) => (
            <div key={index} className="p-6 border border-slate-200 rounded-xl bg-slate-50 relative">
              <button type="button" onClick={() => removeSlide(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-white p-2 rounded-full shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>
              <h3 className="font-semibold text-slate-700 mb-4">Slide #{index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Hình ảnh Banner</label>
                   {/* Automatically update slider state when image is uploaded */}
                   <ImageUpload 
                     defaultValue={slide.image} 
                     onChange={(url) => updateSlide(index, 'image', url)} 
                   />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề lớn</label>
                    <input 
                      value={slide.title} 
                      onChange={(e) => updateSlide(index, 'title', e.target.value)} 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                      placeholder="VD: CÔNG TY TNHH SAMIN"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Đoạn mô tả ngắn</label>
                    <textarea 
                      value={slide.description} 
                      onChange={(e) => updateSlide(index, 'description', e.target.value)} 
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white" 
                      placeholder="VD: Chuyên gia công, lắp đặt mái tôn nhà xưởng..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {slider.length === 0 && (
            <div className="text-center p-8 text-slate-500 border-2 border-dashed rounded-xl">
              Chưa có slide nào. Bấm nút "Thêm Slide" ở trên.
            </div>
          )}
        </div>
      </div>

      {/* Bài viết Giới thiệu */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Trang Giới thiệu (Câu chuyện của chúng tôi)</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nội dung bài viết</label>
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
            <RichTextEditor 
              value={aboutContent}
              onChange={setAboutContent}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Nội dung này sẽ hiển thị ở trang /gioi-thieu.</p>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-8">
        <button 
          type="submit" 
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
        </button>
      </div>

      {/* Flash Message (Toast) */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Đã lưu cấu hình thành công!</span>
        </div>
      )}
    </form>
  );
}
