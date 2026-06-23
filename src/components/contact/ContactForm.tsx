'use client';

import { useActionState } from 'react';
import { Button } from "@/components/ui/button";
import { submitContactForm } from '@/app/actions/contact';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  if (state?.success) {
    return (
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg bg-white p-8 sm:p-12 rounded-3xl shadow-2xl ring-1 ring-emerald-200 border-t-4 border-emerald-500 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Gửi thành công!</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {state.message}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()} className="mx-auto rounded-xl">
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg bg-white p-8 sm:p-12 rounded-3xl shadow-2xl ring-1 ring-slate-200 relative overflow-hidden">
      {isPending && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8">Gửi yêu cầu tư vấn</h2>
      
      {state?.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{state.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">
            Họ và tên *
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-semibold leading-6 text-slate-900">
            Dịch vụ quan tâm
          </label>
          <div className="mt-2.5">
            <select
              name="service"
              id="service"
              className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
            >
              <option value="">Chọn dịch vụ...</option>
              <option value="Dịch vụ mái tôn nhà xưởng">Dịch vụ mái tôn nhà xưởng</option>
              <option value="Thi công nhà xưởng kết cấu thép">Thi công nhà xưởng kết cấu thép</option>
              <option value="Nâng cấp & Cải tạo nhà xưởng">Nâng cấp & Cải tạo nhà xưởng</option>
              <option value="Kho lạnh & Công trình phụ trợ">Kho lạnh & Công trình phụ trợ</option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900">
            Số điện thoại *
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">
            Nội dung yêu cầu *
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button type="submit" size="lg" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto font-bold px-8 shadow-lg shadow-blue-600/30 rounded-xl">
          {isPending ? 'Đang xử lý...' : 'Gửi thông tin'}
        </Button>
      </div>
    </form>
  );
}
