import EditMemberForm from '../../../_forms/EditMemberForm';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inext-production.up.railway.app';
    const res = await fetch(`${apiUrl}/api/members`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch members');
    const members = await res.json();
    console.log(`Building ${members.length} member edit pages`);
    if (members.length === 0) {
      return [{ id: '_placeholder_' }];
    }
    return members.map((m: { id: string }) => ({ id: m.id }));
  } catch (error) {
    console.error('Error generating static params for members:', error);
    return [{ id: '_placeholder_' }];
  }
}

export default function Page() {
  return <EditMemberForm />;
}
