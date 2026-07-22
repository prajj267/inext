import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import 'dotenv/config';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  const journals    = await prisma.publication.count({ where: { pubType: 'Journal' } });
  const conferences = await prisma.publication.count({ where: { pubType: 'Conference' } });
  const total       = await prisma.publication.count();
  console.log(`Total: ${total} | Journals: ${journals} | Conferences: ${conferences}`);

  console.log('\n── Conference papers ──');
  const conf = await prisma.publication.findMany({
    where: { pubType: 'Conference' },
    orderBy: [{ year: 'desc' }],
    select: { year: true, title: true },
  });
  conf.forEach((p, i) => console.log(`${i+1}. [${p.year}] ${p.title}`));
}

main().finally(() => prisma.$disconnect());
