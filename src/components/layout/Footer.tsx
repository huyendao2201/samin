import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function Footer() {
  const dbSettings = await prisma.setting.findMany();
  const settings = dbSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const siteName = settings.site_name || "SAMIN";
  const logoUrl = settings.site_logo || "";
  const phone = settings.contact_phone || "0919 678 693";
  const email = settings.contact_email || "info@samin.vn";
  const address = settings.contact_address || "354/89/16 Phan Văn Trị, Phường Bình Lợi Trung, Thành phố Hồ Chí Minh";
  const fbUrl = settings.facebook_url || "https://www.facebook.com/";
  const zaloUrl = settings.zalo_url || "https://zalo.me/";

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Info */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2 text-white">
              {logoUrl ? (
                 <img src={logoUrl} alt={siteName} className="h-12 w-auto object-contain brightness-0 invert" />
              ) : (
                <>
                  <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-bold text-xl rounded-lg shadow-sm">
                    {siteName.charAt(0)}
                  </div>
                  <span className="font-bold text-2xl tracking-tight">{siteName}</span>
                </>
              )}
            </div>
            <p className="text-sm leading-6">
              Chuyên cung cấp giải pháp nhà xưởng kết cấu thép, mái tôn công nghiệp chuyên nghiệp, bền vững.
            </p>
            <div className="flex space-x-6 items-center">
              {/* Social links */}
              {fbUrl && (
                <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {zaloUrl && (
                <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors font-bold text-lg flex items-center h-6">
                  <span className="sr-only">Zalo</span>
                  Zalo
                </a>
              )}
            </div>
          </div>

          {/* Links & Contact */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Dịch Vụ</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/dich-vu/mai-ton-nha-xuong" className="text-sm leading-6 hover:text-white transition-colors">Mái tôn nhà xưởng</Link></li>
                  <li><Link href="/dich-vu/ket-cau-thep" className="text-sm leading-6 hover:text-white transition-colors">Kết cấu thép</Link></li>
                  <li><Link href="/dich-vu/nang-cap-cai-tao" className="text-sm leading-6 hover:text-white transition-colors">Nâng cấp & Cải tạo</Link></li>
                  <li><Link href="/dich-vu/kho-lanh" className="text-sm leading-6 hover:text-white transition-colors">Kho lạnh</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Sản Phẩm</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link href="/san-pham/ton-lop" className="text-sm leading-6 hover:text-white transition-colors">Tôn lợp</Link></li>
                  <li><Link href="/san-pham/inox" className="text-sm leading-6 hover:text-white transition-colors">Inox - SUS</Link></li>
                  <li><Link href="/san-pham/thep" className="text-sm leading-6 hover:text-white transition-colors">Thép - Steel</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Liên Hệ</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-6">{address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-400 shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm leading-6 hover:text-white transition-colors">{phone}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                    <a href={`mailto:${email}`} className="text-sm leading-6 hover:text-white transition-colors">{email}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs leading-5 text-slate-400 text-center">
            &copy; {new Date().getFullYear()} {siteName.toUpperCase()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
