import EditNewsForm from '../../../_forms/EditNewsForm';

export function generateStaticParams() { return [{ id: '_placeholder_' }]; }
export const dynamicParams = false;

export default function Page() {
  return <EditNewsForm />;
}
