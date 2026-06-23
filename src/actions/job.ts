'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteJob(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.job.delete({
    where: { id }
  });

  revalidatePath('/admin/jobs');
  revalidatePath('/tuyen-dung');
}

export async function saveJob(formData: FormData) {
  const id = formData.get('id') as string;
  
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    department: formData.get('department') as string,
    location: formData.get('location') as string,
    type: formData.get('type') as string,
    salary: formData.get('salary') as string,
    deadline: formData.get('deadline') as string,
    description: formData.get('description') as string,
    isActive: formData.get('isActive') === 'on',
  };

  if (id) {
    await prisma.job.update({
      where: { id },
      data
    });
  } else {
    await prisma.job.create({
      data
    });
  }

  revalidatePath('/admin/jobs');
  revalidatePath('/tuyen-dung');
  redirect('/admin/jobs');
}
