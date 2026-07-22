// Simple script to set project order via API
const API_URL = 'https://inext-production.up.railway.app';
const ADMIN_EMAIL = 'arijitroy@iitp.ac.in';
const ADMIN_PASSWORD = 'abhi@12A';

async function main() {
  // 1. Login to get token
  console.log('Logging in...');
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });
  
  if (!loginRes.ok) {
    console.error('Login failed');
    return;
  }
  
  const { token } = await loginRes.json();
  console.log('✓ Logged in');
  
  // 2. Get all projects
  const projectsRes = await fetch(`${API_URL}/api/projects`);
  const projects = await projectsRes.json();
  
  console.log('\nCurrent projects:');
  projects.forEach((p, i) => {
    console.log(`${i}: ${p.title.substring(0, 60)} (order: ${p.order})`);
  });
  
  // 3. Find the two projects to reorder
  const sportMitra = projects.find(p => p.title.includes('SportMitra'));
  const airGround = projects.find(p => p.title.includes('Air-Ground Data Acquisition'));
  
  if (!sportMitra || !airGround) {
    console.error('\nProjects not found!');
    return;
  }
  
  console.log('\n✓ Found projects to reorder');
  
  // 4. Update SportMitra to order 0
  await fetch(`${API_URL}/api/projects/${sportMitra.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...sportMitra, order: 0 })
  });
  console.log('✓ SportMitra → order 0');
  
  // 5. Update Air-Ground to order 1
  await fetch(`${API_URL}/api/projects/${airGround.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ ...airGround, order: 1 })
  });
  console.log('✓ Air-Ground → order 1');
  
  // 6. Update other projects to order 2+
  let nextOrder = 2;
  for (const project of projects) {
    if (project.id !== sportMitra.id && project.id !== airGround.id) {
      await fetch(`${API_URL}/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...project, order: nextOrder++ })
      });
    }
  }
  console.log(`✓ Other projects → order 2-${nextOrder - 1}`);
  
  // 7. Verify final order
  const updatedRes = await fetch(`${API_URL}/api/projects`);
  const updated = await updatedRes.json();
  
  console.log('\n✅ Final order:');
  updated.forEach((p) => {
    console.log(`${p.order}: ${p.title.substring(0, 60)}`);
  });
}

main().catch(console.error);
