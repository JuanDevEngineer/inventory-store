import { useQuery } from '@tanstack/react-query';
import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { CategoriesProTemplate } from '../components/templates/CategoriesProTemplate';
import { useCategoriesStore } from '../store/CategoriesStore';
import { useCompanyStore } from '../store/CompanyStore';
import { usePermissionsStore, PageLock } from '../index';

export function Categories() {
  const { permissionsData } = usePermissionsStore();
  const hasPermission = permissionsData.some((permission) =>
    permission.modules.name.includes('Categoria de productos'),
  );

  const { fetchCategories, categoriesData, searchCategories, search } =
    useCategoriesStore();
  const { companyData } = useCompanyStore();
  const {
    isLoading,
    error
  } = useQuery({
    queryKey: ['fetch categories', companyData.id],
    queryFn: () => fetchCategories({ company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  useQuery({
    queryKey: ['search categories', search],
    queryFn: () =>
      searchCategories({ description: search, company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  if (!hasPermission) return <PageLock />;
  // loading / error states
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <CategoriesProTemplate data={categoriesData} />
    </>
  );
}
