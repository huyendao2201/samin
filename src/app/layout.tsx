import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-sans",
});



export const metadata: Metadata = {
  title: "SAMIN Việt Nam - Kết Cấu Thép & Mái Tôn Nhà Xưởng",
  description: "Cung cấp giải pháp nhà xưởng kết cấu thép cho doanh nghiệp, thi công mái tôn, nâng cấp và cải tạo nhà xưởng chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${jakarta.variable} h-full antialiased font-sans`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
        <NextTopLoader color="#2563eb" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
