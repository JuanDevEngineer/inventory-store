import { useBrandsStore } from '../store/BrandsStore';
import { useBrands } from '../hooks/queries/useBrands';
import { useCurrentCompany } from '../hooks/queries/useSession';
import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { BrandsTemplate } from '../components/templates/BrandsTemplate';

export function Brands() {
  const { search } = useBrandsStore();
  const { data: company, isPending: isCompanyPending } = useCurrentCompany();
  const {
    data: brands = [],
    isLoading,
    error,
  } = useBrands(company?.id, search);

  // loading / error states
  if (isCompanyPending || isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <BrandsTemplate data={brands} />
    </>
  );
}
