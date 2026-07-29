import EditMemberForm from '../../../_forms/EditMemberForm';

// Dynamic route - no static generation needed
export const dynamic = 'force-dynamic';

export default function Page() {
  return <EditMemberForm />;
}
