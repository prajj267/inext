import EditAchievementForm from '../../../_forms/EditAchievementForm';

// Dynamic route - no static generation needed
export const dynamic = 'force-dynamic';

export default function Page() {
  return <EditAchievementForm />;
}
