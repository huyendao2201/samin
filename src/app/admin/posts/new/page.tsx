import PostForm from "@/components/admin/PostForm";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const categories = await prisma.postCategory.findMany();
  
  return <PostForm categories={categories} />;
}
