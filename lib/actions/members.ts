'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { MemberCategory } from '@/lib/types';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

export async function createMember(data: {
  name: string; role: string; category: MemberCategory;
  focus: string; photo?: string; order?: number;
  links: { label: string; href: string }[];
}) {
  await requireAdmin();
  const { links, ...rest } = data;
  await prisma.member.create({
    data: { ...rest, order: rest.order ?? 0, links: { create: links } },
  });
  revalidatePath('/members');
}

export async function updateMember(id: string, data: {
  name: string; role: string; category: MemberCategory;
  focus: string; photo?: string; order?: number;
  links: { label: string; href: string }[];
}) {
  await requireAdmin();
  const { links, ...rest } = data;
  // Replace links by deleting existing and recreating
  await prisma.memberLink.deleteMany({ where: { memberId: id } });
  await prisma.member.update({
    where: { id },
    data: { ...rest, links: { create: links } },
  });
  revalidatePath('/members');
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await prisma.member.delete({ where: { id } }); // links cascade
  revalidatePath('/members');
}
