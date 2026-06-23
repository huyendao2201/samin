'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteService(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.service.delete({
    where: { id }
  });

  revalidatePath('/admin/services');
  revalidatePath('/dich-vu');
}

export async function saveService(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const parentId = formData.get('parentId') as string;

  const data = {
    title,
    slug,
    description,
    content,
    imageUrl,
    parentId: parentId ? parentId : null,
  };

  if (id) {
    await prisma.service.update({
      where: { id },
      data
    });
  } else {
    await prisma.service.create({
      data
    });
  }

  revalidatePath('/admin/services');
  revalidatePath('/dich-vu');
  redirect('/admin/services');
}
