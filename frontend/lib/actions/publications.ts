'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

export async function createPublication(data: {
  title: string; venue: string; year: number;
  pdfPath?: string; doiUrl?: string;
  authors: { text: string; bold: boolean }[];
}) {
  await requireAdmin();
  const { authors, ...rest } = data;
  await prisma.publication.create({
    data: {
      ...rest,
      authors: { create: authors.map((a, i) => ({ ...a, order: i })) },
    },
  });
  revalidatePath('/publications');
}

export async function updatePublication(id: string, data: {
  title: string; venue: string; year: number;
  pdfPath?: string; doiUrl?: string;
  authors: { text: string; bold: boolean }[];
}) {
  await requireAdmin();
  const { authors, ...rest } = data;
  await prisma.publicationAuthor.deleteMany({ where: { publicationId: id } });
  await prisma.publication.update({
    where: { id },
    data: {
      ...rest,
      authors: { create: authors.map((a, i) => ({ ...a, order: i })) },
    },
  });
  revalidatePath('/publications');
}

export async function deletePublication(id: string) {
  await requireAdmin();
  await prisma.publication.delete({ where: { id } });
  revalidatePath('/publications');
}
