import { useQuery } from '@tanstack/react-query';

import { useCategoriesStore } from '../store/CategoriesStore';
import { useCompanyStore } from '../store/CompanyStore';
import { useBrandsStore } from '../store/BrandsStore';
import { useProductsStore } from '../store/ProductsStore';
import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { ProductsTemplate } from '../components/templates/ProductsTemplate';
import { usePermissionsStore } from '../index';

export function Products() {
  const { permissionsData } = usePermissionsStore();

  permissionsData.some((permission) =>
    permission.modules.name.includes('Productos'),
  );

  const { fetchProducts, productsData, search, searchProducts } =
    useProductsStore();
  const { fetchCategories } = useCategoriesStore();
  const { fetchBrands } = useBrandsStore();
  const { companyData } = useCompanyStore();
  const {
    isLoading,
    error
  } = useQuery({
    queryKey: ['fetch products', companyData?.id],
    queryFn: () => fetchProducts({ _company_id: companyData?.id }),
    enabled: !!companyData?.id,
  });

  // search
  useQuery({
    queryKey: ['search products', search],
    queryFn: () =>
      searchProducts({ description: search, company_id: companyData?.id }),
    enabled: !!companyData?.id,
  });

  // fetch brands
  useQuery({
    queryKey: ['fetch brands', companyData?.id],
    queryFn: () => fetchBrands({ company_id: companyData?.id }),
    enabled: !!companyData?.id,
  });

  // fetch categories
  useQuery({
    queryKey: ['fetch categories', companyData?.id],
    queryFn: () => fetchCategories({ company_id: companyData?.id }),
    enabled: !!companyData?.id,
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
      <ProductsTemplate data={productsData} />
    </>
  );
}
