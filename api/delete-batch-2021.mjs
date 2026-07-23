// Script to delete batch 2021-2025 students
const API_URL = 'https://inext-production.up.railway.app';
const ADMIN_EMAIL = 'arijitroy@iitp.ac.in';
const ADMIN_PASSWORD = 'abhi@12A';

async function main() {
  // 1. Login
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
  console.log('✓ Logged in\n');
  
  // 2. Get all members
  const membersRes = await fetch(`${API_URL}/api/members`);
  const members = await membersRes.json();
  
  // 3. Find batch 2021-2025 students
  const batch2021 = members.filter(m => 
    m.category === 'UNDERGRAD' && 
    m.focus && 
    (m.focus.includes('2021') || m.focus.includes('Batch: 2021'))
  );
  
  console.log('Batch 2021-2025 students to delete:');
  batch2021.forEach(m => console.log(`- ${m.name} (${m.focus})`));
  console.log(`\nTotal: ${batch2021.length} students\n`);
  
  if (batch2021.length === 0) {
    console.log('No students found to delete.');
    return;
  }
  
  // 4. Delete each student
  console.log('Deleting students...');
  for (const student of batch2021) {
    try {
      const deleteRes = await fetch(`${API_URL}/api/members/${student.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (deleteRes.ok) {
        console.log(`✓ Deleted ${student.name}`);
      } else {
        console.log(`✗ Failed to delete ${student.name}`);
      }
    } catch (error) {
      console.log(`✗ Error deleting ${student.name}:`, error.message);
    }
  }
  
  console.log('\n✅ Done!');
}

main().catch(console.error);
