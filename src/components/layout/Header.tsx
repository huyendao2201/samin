'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Giới thiệu', href: '/gioi-thieu' },
  { 
    name: 'Dịch vụ', 
    href: '/dich-vu',
    children: [
      { name: 'Mái tôn nhà xưởng', href: '/dich-vu/mai-ton-nha-xuong' },
      { name: 'Thi công kết cấu thép', href: '/dich-vu/ket-cau-thep' },
      { name: 'Nâng cấp cải tạo', href: '/dich-vu/nang-cap-cai-tao' },
      { name: 'Kho lạnh & Phụ trợ', href: '/dich-vu/kho-lanh' },
    ]
  },
  { 
    name: 'Sản phẩm & Vật tư', 
    href: '/san-pham'
  },
  { name: 'Kiến thức', href: '/kien-thuc' },
  { name: 'Tuyển dụng', href: '/tuyen-dung' },
  { name: 'Liên hệ', href: '/lien-he' },
];

export default function Header({ 
  siteName = "SAMIN", 
  logoUrl = "", 
  phone = "0919 678 693" 
}: { 
  siteName?: string, 
  logoUrl?: string, 
  phone?: string 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">{siteName}</span>
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
            ) : (
              <>
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold text-xl rounded-lg shadow-sm">
                  {siteName.charAt(0)}
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">{siteName}</span>
              </>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Mở menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            if (item.children) {
              return (
                <div key={item.name} className="relative group flex items-center h-full">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors hover:text-blue-600 py-2 ${
                      isActive ? 'text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:-rotate-180 duration-300" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-60 z-50">
                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-2 flex flex-col gap-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent -z-10"></div>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center text-sm font-semibold transition-colors hover:text-blue-600 py-2 ${
                  isActive ? 'text-blue-600' : 'text-slate-700'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                {logoUrl ? (
                  <img src={logoUrl} alt={siteName} className="h-8 w-auto object-contain" />
                ) : (
                  <>
                    <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded-lg">
                      {siteName.charAt(0)}
                    </div>
                    <span className="font-bold text-lg text-slate-900">{siteName}</span>
                  </>
                )}
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Đóng menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => !item.children && setMobileMenuOpen(false)}
                          className={`-mx-3 flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-slate-50 ${
                            isActive ? 'text-blue-600 bg-blue-50/50' : 'text-slate-900'
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <div className="mt-1 space-y-1 pl-4 border-l-2 border-slate-100 ml-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="py-6">
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                  >
                    <Phone className="h-5 w-5 text-blue-600" />
                    Hotline: {phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
