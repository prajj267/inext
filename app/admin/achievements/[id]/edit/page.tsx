import EditAchievementForm from '../../../_forms/EditAchievementForm';

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inext-production.up.railway.app';
    const res = await fetch(`${apiUrl}/api/achievements`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch achievements');
    const achievements = await res.json();
    console.log(`Building ${achievements.length} achievement edit pages`);
    if (achievements.length === 0) {
      return [{ id: '_placeholder_' }];
    }
    return achievements.map((a: { id: string }) => ({ id: a.id }));
  } catch (error) {
    console.error('Error generating static params for achievements:', error);
    return [{ id: '_placeholder_' }];
  }
}

export default function Page() {
  return <EditAchievementForm />;
}
