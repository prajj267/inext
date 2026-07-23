import EditNewsForm from '../../../_forms/EditNewsForm';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inext-production.up.railway.app';
    const res = await fetch(`${apiUrl}/api/news`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch news');
    const news = await res.json();
    console.log(`Building ${news.length} news edit pages`);
    if (news.length === 0) {
      return [{ id: '_placeholder_' }];
    }
    return news.map((n: { id: string }) => ({ id: n.id }));
  } catch (error) {
    console.error('Error generating static params for news:', error);
    return [{ id: '_placeholder_' }];
  }
}

export default function Page() {
  return <EditNewsForm />;
}
