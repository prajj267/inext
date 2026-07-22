'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { AchievementCategory } from '@/lib/types';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

export async function createAchievement(data: {
  year: string; title: string; description: string; category: AchievementCategory;
}) {
  await requireAdmin();
  await prisma.achievement.create({ data });
  revalidatePath('/achievements');
}

export async function updateAchievement(id: string, data: {
  year: string; title: string; description: string; category: AchievementCategory;
}) {
  await requireAdmin();
  await prisma.achievement.update({ where: { id }, data });
  revalidatePath('/achievements');
}

export async function deleteAchievement(id: string) {
  await requireAdmin();
  await prisma.achievement.delete({ where: { id } });
  revalidatePath('/achievements');
}
