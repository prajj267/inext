const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Get all projects first
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log('Current projects:');
  projects.forEach(p => {
    console.log(`${p.order}: ${p.title.substring(0, 80)}`);
  });
  
  // Find the two projects to move to top
  const sportMitra = projects.find(p => p.title.includes('SportMitra'));
  const airGround = projects.find(p => p.title.includes('Air-Ground Data Acquisition'));
  
  if (!sportMitra || !airGround) {
    console.log('\nProjects not found!');
    return;
  }
  
  console.log('\nMoving these projects to top:');
  console.log('1. SportMitra');
  console.log('2. Air-Ground Data Acquisition');
  
  // Update SportMitra to order 0
  await prisma.project.update({
    where: { id: sportMitra.id },
    data: { order: 0 }
  });
  
  // Update Air-Ground to order 1
  await prisma.project.update({
    where: { id: airGround.id },
    data: { order: 1 }
  });
  
  // Update other projects to orders 2, 3, 4, etc.
  let newOrder = 2;
  for (const project of projects) {
    if (project.id !== sportMitra.id && project.id !== airGround.id) {
      await prisma.project.update({
        where: { id: project.id },
        data: { order: newOrder++ }
      });
    }
  }
  
  console.log('\n✅ Project order updated!');
  
  // Show new order
  const updatedProjects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log('\nNew order:');
  updatedProjects.forEach(p => {
    console.log(`${p.order}: ${p.title.substring(0, 80)}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
