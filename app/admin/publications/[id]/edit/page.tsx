import EditPublicationForm from '../../../_forms/EditPublicationForm';

// Dynamic route - no static generation needed
export const dynamic = 'force-dynamic';

export default function Page() {
  return <EditPublicationForm />;
}
