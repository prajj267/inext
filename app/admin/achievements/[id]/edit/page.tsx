import EditAchievementForm from '../../../_forms/EditAchievementForm';

export function generateStaticParams() { return [{ id: '_placeholder_' }]; }
export const dynamicParams = false;

export default function Page() {
  return <EditAchievementForm />;
}
