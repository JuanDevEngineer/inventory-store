import { useQuery } from '@tanstack/react-query';

import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { KardexTemplate } from '../components/templates/KardexTemplate';
import { useCompanyStore } from '../store/CompanyStore';
import { useProductsStore } from '../store/ProductsStore';
import { useKardexStore } from '../store/KardexStore';
import { usePermissionsStore, PageLock } from '../index';

export function Kardex() {
  const { permissionsData } = usePermissionsStore();
  const hasPermission = permissionsData.some((permission) =>
    permission.modules.name.includes('Kardex'),
  );

  const { fetchProducts, productsData, search, searchProducts } =
    useProductsStore();
  const { fetchKardex, searchKardex, search: kardexSearch } = useKardexStore();
  const { companyData } = useCompanyStore();
  const {
    isLoading,
    error
  } = useQuery({
    queryKey: ['fetch products', companyData.id],
    queryFn: () => fetchProducts({ _company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // product search
  useQuery({
    queryKey: ['search products', search],
    queryFn: () =>
      searchProducts({ description: search, company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // fetch kardex
  useQuery({
    queryKey: ['fetch kardex', companyData.id],
    queryFn: () => fetchKardex({ company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // kardex search
  useQuery({
    queryKey: ['search kardex', kardexSearch],
    queryFn: () =>
      searchKardex({ search: kardexSearch, company_id: companyData.id }),
    enabled: companyData.id != null,
  });

  // loading / error states
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  if (hasPermission == false) return <PageLock state={hasPermission} />;
  return <KardexTemplate data={productsData} />;
}
