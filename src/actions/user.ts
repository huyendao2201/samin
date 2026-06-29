'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

export async function saveUser(formData: FormData) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN') throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const password = formData.get('password') as string;

  if (id) {
    // Edit existing user
    const updateData: any = { name, email, role };
    if (password) {
      updateData.password = password; // Should be hashed in production
    }

    await prisma.user.update({
      where: { id },
      data: updateData
    });
  } else {
    // Create new user
    if (!password) {
      throw new Error('Mật khẩu là bắt buộc khi tạo tài khoản mới.');
    }
    
    await prisma.user.create({
      data: {
        name,
        email,
        password, // Should be hashed in production
        role: role || 'EDITOR'
      }
    });
  }

  revalidatePath('/admin/accounts');
  redirect('/admin/accounts');
}

export async function deleteUser(formData: FormData) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN') throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  
  if (id === currentUser.id) {
    throw new Error('Không thể tự xóa tài khoản của chính mình.');
  }

  await prisma.user.delete({
    where: { id }
  });

  revalidatePath('/admin/accounts');
}
