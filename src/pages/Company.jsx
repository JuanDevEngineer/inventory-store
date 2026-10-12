import { useCompanyStore } from '../store/CompanyStore';
import { CompanyTemplate } from '../components/templates/CompanyTemplate';
import { useQuery } from '@tanstack/react-query';
import { usePermissionsStore } from '../store/PermissionsStore';

export function Company() {
  const { permissionsData } = usePermissionsStore();

  permissionsData.some((permission) =>
    permission.modules.name.includes('Tu empresa'),
  );

  const { countUsersByCompany, companyData } = useCompanyStore();

  // fetch the number of users in the company
  useQuery({
    queryKey: ['user count', companyData?.id],
    queryFn: () => countUsersByCompany({ company_id: companyData?.id }),
    enabled: !!companyData?.id,
  });

  return (
    <>
      <CompanyTemplate />
    </>
  );
}
