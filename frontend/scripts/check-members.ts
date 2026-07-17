import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import 'dotenv/config';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.member.count({ where: { category: 'UNDERGRAD' } });
  console.log('UNDERGRAD count:', count);
  const members = await prisma.member.findMany({
    where: { category: 'UNDERGRAD' },
    orderBy: { order: 'asc' },
    select: { name: true, order: true },
  });
  members.forEach((m) => console.log(m.order, m.name));
}

main().finally(() => prisma.$disconnect());
