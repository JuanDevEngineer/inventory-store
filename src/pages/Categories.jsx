import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { PageLock } from '../components/molecules/PageLock';
import { CategoriesProTemplate } from '../components/templates/CategoriesProTemplate';
import { useCategoriesStore } from '../store/CategoriesStore';
import { useCategories } from '../hooks/queries/useCategories';
import { useCurrentCompany, useHasPermission } from '../hooks/queries/useSession';

export function Categories() {
  const hasPermission = useHasPermission('Categoria de productos');
  const { search } = useCategoriesStore();
  const { data: company, isPending: isCompanyPending } = useCurrentCompany();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useCategories(company?.id, search);

  if (hasPermission === false) return <PageLock />;
  // loading / error states
  if (isCompanyPending || isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <CategoriesProTemplate data={categories} />
    </>
  );
}
