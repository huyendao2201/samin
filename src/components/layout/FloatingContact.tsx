'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact({
  zaloUrl = "https://zalo.me/0907621988",
  phone = "0919678693"
}: {
  zaloUrl?: string;
  phone?: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Zalo Button (Blue color usually) */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-110 active:scale-95"
      >
        <span className="sr-only">Chat Zalo</span>
        <MessageCircle className="h-6 w-6" />
        {/* Simple tooltip */}
        <span className="absolute right-full mr-4 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
          Chat Zalo
        </span>
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-110 active:scale-95 relative"
      >
        <span className="sr-only">Gọi ngay</span>
        <Phone className="h-6 w-6 animate-pulse" />
        <span className="absolute right-full mr-4 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
          Gọi ngay
        </span>
        {/* Ripple effect */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-red-400 opacity-75"></span>
      </a>
    </div>
  );
}
