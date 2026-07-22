import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import 'dotenv/config';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  const all = await prisma.project.findMany({ orderBy: { createdAt: 'asc' }, select: { title: true, category: true } });
  console.log(`Total projects: ${all.length}`);
  all.forEach((p, i) => console.log(`${i+1}. [${p.category}] ${p.title}`));
}

main().finally(() => prisma.$disconnect());
