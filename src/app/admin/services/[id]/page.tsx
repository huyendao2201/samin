import ServiceForm from "@/components/admin/ServiceForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const service = await prisma.service.findUnique({
    where: { id }
  });

  if (!service) {
    notFound();
  }

  const parents = await prisma.service.findMany({
    where: { parentId: null }
  });

  return <ServiceForm service={service} parents={parents} />;
}
