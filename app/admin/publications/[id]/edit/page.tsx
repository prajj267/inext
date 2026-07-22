import EditPublicationForm from '../../../_forms/EditPublicationForm';

export function generateStaticParams() { return [{ id: '_placeholder_' }]; }
export const dynamicParams = false;

export default function Page() {
  return <EditPublicationForm />;
}
