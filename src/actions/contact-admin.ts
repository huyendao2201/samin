'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateContactStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;

  await prisma.contact.update({
    where: { id },
    data: { status }
  });

  revalidatePath('/admin/contacts');
}

export async function deleteContact(formData: FormData) {
  const id = formData.get('id') as string;

  await prisma.contact.delete({
    where: { id }
  });

  revalidatePath('/admin/contacts');
}
