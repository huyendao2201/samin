'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveSettings(formData: FormData) {
  const keys = ['site_name', 'site_logo', 'contact_phone', 'contact_email', 'contact_address', 'facebook_url', 'zalo_url', 'about_content'];
  
  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
  }

  // Handle slider (JSON string)
  const sliderData = formData.get('homepage_slider') as string;
  if (sliderData) {
    await prisma.setting.upsert({
      where: { key: 'homepage_slider' },
      update: { value: sliderData },
      create: { key: 'homepage_slider', value: sliderData }
    });
  }

  revalidatePath('/');
  revalidatePath('/admin/settings');
  revalidatePath('/lien-he');
  return { success: true };
}
