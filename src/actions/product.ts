'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.product.delete({
    where: { id }
  });

  revalidatePath('/admin/products');
  revalidatePath('/san-pham');
}

export async function saveProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const categoryId = formData.get('categoryId') as string;
  
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    imageUrl: formData.get('imageUrl') as string,
    isActive: formData.get('isActive') === 'on',
    categoryId: categoryId,
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data
    });
  } else {
    await prisma.product.create({
      data
    });
  }

  revalidatePath('/admin/products');
  revalidatePath('/san-pham');
  redirect('/admin/products');
}
