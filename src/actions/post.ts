'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.post.delete({
    where: { id }
  });

  revalidatePath('/admin/posts');
  revalidatePath('/kien-thuc');
}

export async function savePost(formData: FormData) {
  const id = formData.get('id') as string;
  const categoryId = formData.get('categoryId') as string;
  
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    imageUrl: formData.get('imageUrl') as string,
    isPublished: formData.get('isPublished') === 'on',
    categoryId: categoryId,
  };

  if (id) {
    await prisma.post.update({
      where: { id },
      data
    });
  } else {
    await prisma.post.create({
      data
    });
  }

  revalidatePath('/admin/posts');
  revalidatePath('/kien-thuc');
  redirect('/admin/posts');
}
