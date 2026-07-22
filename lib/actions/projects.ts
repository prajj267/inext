'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { ProjectStatus } from '@/lib/types';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

interface ProjectData {
  title:          string;
  description:    string;
  status:         ProjectStatus;
  category?:      string;
  role?:          string;
  funding?:       string;
  amount?:        string;
  period?:        string;
  collaborators?: string;
}

export async function createProject(data: ProjectData) {
  await requireAdmin();
  await prisma.project.create({ data });
  revalidatePath('/projects');
}

export async function updateProject(id: string, data: ProjectData) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data });
  revalidatePath('/projects');
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath('/projects');
}
