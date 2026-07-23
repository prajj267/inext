import EditProjectForm from '../../../_forms/EditProjectForm';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inext-production.up.railway.app';
    const res = await fetch(`${apiUrl}/api/projects`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const projects = await res.json();
    console.log(`Building ${projects.length} project edit pages`);
    if (projects.length === 0) {
      return [{ id: '_placeholder_' }];
    }
    return projects.map((p: { id: string }) => ({ id: p.id }));
  } catch (error) {
    console.error('Error generating static params for projects:', error);
    return [{ id: '_placeholder_' }];
  }
}

export default function Page() {
  return <EditProjectForm />;
}
