'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;

    if (!name || !phone || !message) {
      return { success: false, error: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' };
    }

    await prisma.contact.create({
      data: {
        name,
        phone,
        service: service || 'Chưa xác định',
        message,
        status: 'NEW',
      },
    });

    revalidatePath('/admin/contacts');

    return { success: true, message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.' };
  } catch (error) {
    console.error('Lỗi khi gửi form liên hệ:', error);
    return { success: false, error: 'Có lỗi xảy ra trong quá trình gửi. Vui lòng thử lại sau.' };
  }
}
