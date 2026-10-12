import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { StaffTemplate } from '../components/templates/StaffTemplate';
import { PageLock } from '../components/molecules/PageLock';
import { useStaffStore } from '../store/StaffStore';
import { useStaff } from '../hooks/queries/useStaff';
import { useCurrentCompany, useHasPermission } from '../hooks/queries/useSession';

export function Staff() {
  const hasPermission = useHasPermission('Personal');
  const { search } = useStaffStore();
  const { data: company, isPending: isCompanyPending } = useCurrentCompany();
  const { data: staff = [], isLoading, error } = useStaff(company?.id, search);

  if (hasPermission === false) return <PageLock state={hasPermission} />;
  // loading / error states
  if (isCompanyPending || isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...{error.message}</span>;
  }

  return (
    <>
      <StaffTemplate data={staff} />
    </>
  );
}
