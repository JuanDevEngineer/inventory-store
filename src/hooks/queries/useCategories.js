// Server state for categories. UI state (search text, selected category)
// stays in useCategoriesStore.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  DeleteAllCategories,
  DeleteCategory,
  EditCategory,
  FetchCategories,
  InsertCategory,
  SearchCategories,
} from '../../services/categories';

export const categoryKeys = {
  all: ['categories'],
  list: (companyId, search = '') => ['categories', companyId, search],
};

// Categories of a company, filtered by description when `search` is not empty
export function useCategories(companyId, search = '') {
  return useQuery({
    queryKey: categoryKeys.list(companyId, search),
    queryFn: async () => {
      const data = search
        ? await SearchCategories({ company_id: companyId, description: search })
        : await FetchCategories({ company_id: companyId });
      return data ?? [];
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  });
}

function useCategoryMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      // product lists show the category name and color
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// p: { _description, _color, _company_id }
export const useCreateCategory = () => useCategoryMutation(InsertCategory);

// p: { id, description, color, company_id }
export const useUpdateCategory = () => useCategoryMutation(EditCategory);

// p: { id }
export const useDeleteCategory = () => useCategoryMutation(DeleteCategory);

// p: { userId }
export const useDeleteAllCategories = () => useCategoryMutation(DeleteAllCategories);
