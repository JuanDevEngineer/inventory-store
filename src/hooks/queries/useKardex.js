// Server state for kardex (stock entries and exits). The search text stays
// in useKardexStore.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FetchKardex, InsertKardex, SearchKardex } from '../../services/kardex';

export const kardexKeys = {
  all: ['kardex'],
  list: (companyId, search = '') => ['kardex', companyId, search],
};

// Movements of a company, newest first, filtered by product when `search` is set
export function useKardex(companyId, search = '') {
  return useQuery({
    queryKey: kardexKeys.list(companyId, search),
    queryFn: async () => {
      const data = search
        ? await SearchKardex({ company_id: companyId, search })
        : await FetchKardex({ company_id: companyId });
      return data ?? [];
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  });
}

// p: { date, type, user_id, product_id, quantity, detail, company_id }
export function useCreateKardexMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InsertKardex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kardexKeys.all });
      // a movement changes the product stock
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
}
