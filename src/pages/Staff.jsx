import { useQuery } from '@tanstack/react-query';

import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { StaffTemplate } from '../components/templates/StaffTemplate';
import { PageLock } from '../components/molecules/PageLock';
import { useCompanyStore } from '../store/CompanyStore';
import { useGlobalStore } from '../store/GlobalStore';
import { useUsersStore } from '../store/UsersStore';
import { usePermissionsStore } from '../store/PermissionsStore';

export function Staff() {
  const { permissionsData } = usePermissionsStore();
  const hasPermission = permissionsData.some((permission) =>
    permission.modules.name.includes('Personal'),
  );

  const { fetchAllUsers, allUsersData } = useUsersStore();
  const { companyData } = useCompanyStore();
  const { fetchModules } = useGlobalStore();

  // fetch data
  const {
    isLoading,
    error
  } = useQuery({
    queryKey: ['fetch all users', companyData?.id],
    queryFn: () => fetchAllUsers({ _company_id: companyData?.id }),
    enabled: !!companyData?.id,
  });

  // modules
  useQuery({
    queryKey: ['fetch modules'],
    queryFn: fetchModules,
  });

  if (hasPermission == false) return <PageLock state={hasPermission} />;
  // loading / error states
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...{error.message}</span>;
  }

  return (
    <>
      <StaffTemplate data={allUsersData} />
    </>
  );
}
