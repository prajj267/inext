// Quick script to update project order via API
const API_URL = 'https://inext-production.up.railway.app';

async function main() {
  // Get all projects
  const res = await fetch(`${API_URL}/api/projects`);
  const projects = await res.json();
  
  console.log('Current projects:');
  projects.forEach((p: any) => {
    console.log(`${p.order}: ${p.title.substring(0, 60)}`);
  });
  
  // Find the two projects
  const sportMitra = projects.find((p: any) => p.title.includes('SportMitra'));
  const airGround = projects.find((p: any) => p.title.includes('Air-Ground Data Acquisition'));
  
  if (!sportMitra || !airGround) {
    console.log('\nProjects not found!');
    return;
  }
  
  console.log('\n✅ Found projects to reorder:');
  console.log(`- SportMitra (current order: ${sportMitra.order})`);
  console.log(`- Air-Ground (current order: ${airGround.order})`);
  console.log(`\nIDs: ${sportMitra.id}, ${airGround.id}`);
}

main().catch(console.error);
