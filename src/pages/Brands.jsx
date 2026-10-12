import { useQuery } from '@tanstack/react-query';
import { useCompanyStore } from '../store/CompanyStore';
import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { BrandsTemplate } from '../components/templates/BrandsTemplate';
import { useBrandsStore } from '../store/BrandsStore';

export function Brands() {
  const { fetchBrands, brandsData, searchBrands } = useBrandsStore();
  const { search } = useBrandsStore();
  const { companyData } = useCompanyStore();
  // fetch data
  const {
    isLoading,
    error
  } = useQuery({
    queryKey: ['fetch brands', companyData.id],
    queryFn: () => fetchBrands({ company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // search
  useQuery({
    queryKey: ['search brands', search],
    queryFn: () =>
      searchBrands({ description: search, company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // loading / error states
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <BrandsTemplate data={brandsData} />
    </>
  );
}
