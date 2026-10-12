import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { ProductsTemplate } from '../components/templates/ProductsTemplate';
import { useProductsStore } from '../store/ProductsStore';
import { useProducts } from '../hooks/queries/useProducts';
import { useCurrentCompany } from '../hooks/queries/useSession';

export function Products() {
  const { search } = useProductsStore();
  const { data: company, isPending: isCompanyPending } = useCurrentCompany();
  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts(company?.id, search);

  // loading / error states
  if (isCompanyPending || isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return (
    <>
      <ProductsTemplate data={products} />
    </>
  );
}
