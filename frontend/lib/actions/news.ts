'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { NewsTag } from '@/lib/types';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

export async function createNewsItem(data: {
  date: string; tag: NewsTag; body: string;
}) {
  await requireAdmin();
  await prisma.newsItem.create({ data });
  revalidatePath('/news');
  revalidatePath('/');
}

export async function updateNewsItem(id: string, data: {
  date: string; tag: NewsTag; body: string;
}) {
  await requireAdmin();
  await prisma.newsItem.update({ where: { id }, data });
  revalidatePath('/news');
  revalidatePath('/');
}

export async function deleteNewsItem(id: string) {
  await requireAdmin();
  await prisma.newsItem.delete({ where: { id } });
  revalidatePath('/news');
  revalidatePath('/');
}
