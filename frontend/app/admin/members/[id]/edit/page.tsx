import EditMemberForm from '../../../_forms/EditMemberForm';

export function generateStaticParams() { return [{ id: '_placeholder_' }]; }
export const dynamicParams = false;

export default function Page() {
  return <EditMemberForm />;
}
