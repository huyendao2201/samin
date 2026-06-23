'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Vui lòng nhập đầy đủ email và mật khẩu.' };
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || user.password !== password) {
    return { error: 'Email hoặc mật khẩu không chính xác.' };
  }

  // Create session cookie
  // Note: in a real production app, use JWT or iron-session and hash passwords
  const cookieStore = await cookies();
  cookieStore.set('admin_session', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
