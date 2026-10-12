// Server state for brands: React Query owns the data, the cache and the
// refetch after every change. UI state (search text, selected brand) stays
// in useBrandsStore.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DeleteBrand,
  EditBrand,
  FetchBrands,
  InsertBrand,
  SearchBrands,
} from '../../services/brands';

export const brandKeys = {
  all: ['brands'],
  list: (companyId, search = '') => ['brands', companyId, search],
};

// Brands of a company, filtered by description when `search` is not empty
export function useBrands(companyId, search = '') {
  return useQuery({
    queryKey: brandKeys.list(companyId, search),
    queryFn: async () => {
      const data = search
        ? await SearchBrands({ company_id: companyId, description: search })
        : await FetchBrands({ company_id: companyId });
      return data ?? [];
    },
    enabled: !!companyId,
    // keep showing the current list while a new search loads
    placeholderData: keepPreviousData,
  });
}

function useBrandMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
      // product lists show the brand name
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// p: { _description, _company_id }
export const useCreateBrand = () => useBrandMutation(InsertBrand);

// p: { id, description }
export const useUpdateBrand = () => useBrandMutation(EditBrand);

// p: { id }
export const useDeleteBrand = () => useBrandMutation(DeleteBrand);
