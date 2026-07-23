import { PrismaClient } from '@prisma/client';

process.env.DATABASE_URL = "postgresql://neondb_owner:npg_ZQVh4zv1xqla@ep-dawn-glade-ad2vo6fr-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

const prisma = new PrismaClient();

async function main() {
  // IDs from the query
  const sportMitraId = 'cmrvp62gd006390f4uabusz2a';
  const airGroundId = 'cmrvp62gd006490f4llgx2g66';
  
  // Get all projects
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' }
  });
  
  console.log('Current projects:');
  projects.forEach((p, i) => {
    console.log(`${i}: ${p.title.substring(0, 60)} (order: ${p.order})`);
  });
  
  // Set orders: SportMitra = 0, AirGround = 1, others = 2+
  console.log('\nUpdating orders...');
  
  await prisma.project.update({
    where: { id: sportMitraId },
    data: { order: 0 }
  });
  console.log('✓ SportMitra → order 0');
  
  await prisma.project.update({
    where: { id: airGroundId },
    data: { order: 1 }
  });
  console.log('✓ Air-Ground → order 1');
  
  // Update others
  let nextOrder = 2;
  for (const project of projects) {
    if (project.id !== sportMitraId && project.id !== airGroundId) {
      await prisma.project.update({
        where: { id: project.id },
        data: { order: nextOrder++ }
      });
    }
  }
  console.log(`✓ Other projects → order 2-${nextOrder - 1}`);
  
  // Show final order
  const updated = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log('\n✅ Final order:');
  updated.forEach((p) => {
    console.log(`${p.order}: ${p.title.substring(0, 60)}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
