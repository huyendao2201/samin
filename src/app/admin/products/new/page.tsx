import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany();
  
  return <ProductForm categories={categories} />;
}
