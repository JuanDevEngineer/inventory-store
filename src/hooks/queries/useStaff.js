// Server state for staff (company users), modules and admin sign up.
// The search text stays in useStaffStore.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CreateStaffMember,
  DeleteUser,
  FetchAllUsers,
  RegisterAdminAccount,
  SearchStaff,
  UpdateStaffMember,
} from '../../services/users';
import { FetchAllModules } from '../../services/modules';

export const staffKeys = {
  all: ['staff'],
  list: (companyId, search = '') => ['staff', companyId, search],
};

// Users assigned to a company, filtered by name when `search` is set
export function useStaff(companyId, search = '') {
  return useQuery({
    queryKey: staffKeys.list(companyId, search),
    queryFn: async () => {
      const data = search
        ? await SearchStaff({ _company_id: companyId, search })
        : await FetchAllUsers({ _company_id: companyId });
      return data ?? [];
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
  });
}

// All app modules, used to assign permissions
export function useModules() {
  return useQuery({
    queryKey: ['modules'],
    queryFn: async () => (await FetchAllModules()) ?? [],
    staleTime: Infinity,
  });
}

function useStaffMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      queryClient.invalidateQueries({ queryKey: ['company-user-count'] });
    },
  });
}

// { authParams: { email, password }, user, permissionChecks }
export const useCreateStaff = () =>
  useStaffMutation(({ authParams, user, permissionChecks }) =>
    CreateStaffMember(authParams, user, permissionChecks),
  );

// { user, permissionChecks }
export const useUpdateStaff = () =>
  useStaffMutation(({ user, permissionChecks }) => UpdateStaffMember(user, permissionChecks));

// p: { id }
export const useDeleteStaff = () => useStaffMutation(DeleteUser);

// p: { email, password, user_type }
export function useRegisterAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RegisterAdminAccount,
    // signing in may load the session before the user row exists
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['current-company'] });
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
}
