import ServiceForm from "@/components/admin/ServiceForm";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function NewServicePage() {
  const parents = await prisma.service.findMany({
    where: { parentId: null }
  });

  return <ServiceForm parents={parents} />;
}
