// Server state for products. UI state (search text, selected product)
// stays in useProductsStore.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DeleteProduct,
  EditProduct,
  FetchProducts,
  InsertProduct,
  SearchProducts,
} from '../../services/products';

export const productKeys = {
  all: ['products'],
  list: (companyId, search = '') => ['products', companyId, search],
};

// Products of a company (with brand and category), filtered when `search` is set
export function useProducts(companyId, search = '') {
  return useQuery({
    queryKey: productKeys.list(companyId, search),
    queryFn: async () => {
      const data = search
        ? await SearchProducts({ company_id: companyId, description: search })
        : await FetchProducts({ _company_id: companyId });
      return data ?? [];
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  });
}

function useProductMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      // kardex rows and reports show product names, stock and prices
      queryClient.invalidateQueries({ queryKey: ['kardex'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}

// p: { _description, _brand_id, _stock, _min_stock, _barcode, _internal_code,
//      _sale_price, _purchase_price, _category_id, _company_id }
export const useCreateProduct = () => useProductMutation(InsertProduct);

// p: { id, ...product columns }
export const useUpdateProduct = () => useProductMutation(EditProduct);

// p: { id }
export const useDeleteProduct = () => useProductMutation(DeleteProduct);
