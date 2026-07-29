import EditNewsForm from '../../../_forms/EditNewsForm';

// Dynamic route - no static generation needed
export const dynamic = 'force-dynamic';

export default function Page() {
  return <EditNewsForm />;
}
