import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import NextTopLoader from "nextjs-toploader";
import prisma from "@/lib/prisma";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global settings
  const dbSettings = await prisma.setting.findMany({
    where: {
      key: { in: ['site_name', 'site_logo', 'contact_phone', 'zalo_url'] }
    }
  });
  const settings = dbSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <NextTopLoader color="#2563eb" showSpinner={false} height={3} shadow="0 0 10px #2563eb,0 0 5px #2563eb" />
      <Header 
        siteName={settings.site_name} 
        logoUrl={settings.site_logo} 
        phone={settings.contact_phone} 
      />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingContact 
        zaloUrl={settings.zalo_url}
        phone={settings.contact_phone}
      />
    </>
  );
}
