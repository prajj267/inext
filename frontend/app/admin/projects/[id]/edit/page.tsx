import EditProjectForm from '../../../_forms/EditProjectForm';

export function generateStaticParams() { return [{ id: '_placeholder_' }]; }
export const dynamicParams = false;

export default function Page() {
  return <EditProjectForm />;
}
