import EditPublicationForm from '../../../_forms/EditPublicationForm';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inext-production.up.railway.app';
    const res = await fetch(`${apiUrl}/api/publications`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch publications');
    const publications = await res.json();
    console.log(`Building ${publications.length} publication edit pages`);
    if (publications.length === 0) {
      return [{ id: '_placeholder_' }];
    }
    return publications.map((p: { id: string }) => ({ id: p.id }));
  } catch (error) {
    console.error('Error generating static params for publications:', error);
    return [{ id: '_placeholder_' }];
  }
}

export default function Page() {
  return <EditPublicationForm />;
}
