import EditProjectForm from '../../../_forms/EditProjectForm';

// Dynamic route - no static generation needed
export const dynamic = 'force-dynamic';

export default function Page() {
  return <EditProjectForm />;
}
