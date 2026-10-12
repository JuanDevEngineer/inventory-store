// Data about the logged-in user: their app user row, company and module
// permissions. Every component can call these hooks; React Query shares one
// request and one cache entry between them.
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { FetchUser } from '../../services/users';
import { CountUsersByCompany, FetchCompany } from '../../services/companies';
import { FetchPermissions } from '../../services/permissions';

export const sessionKeys = {
  // keyed by the auth account so switching accounts never shows stale data
  user: (authId) => ['current-user', authId],
  company: (userId) => ['current-company', userId],
  permissions: (userId) => ['permissions', userId],
  userCount: (companyId) => ['company-user-count', companyId],
};

export function useCurrentUser() {
  const { user } = useAuth();
  const authId = user?.id;
  return useQuery({
    queryKey: sessionKeys.user(authId),
    queryFn: FetchUser,
    enabled: !!authId,
  });
}

export function useCurrentCompany() {
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id;
  return useQuery({
    queryKey: sessionKeys.company(userId),
    queryFn: () => FetchCompany({ userId }),
    enabled: !!userId,
  });
}

// Module permissions of a user: the current one when `userId` is omitted,
// nobody (disabled query) when it is null
export function usePermissions(userId) {
  const { data: currentUser } = useCurrentUser();
  const id = userId === undefined ? currentUser?.id : userId;
  return useQuery({
    queryKey: sessionKeys.permissions(id),
    queryFn: async () => (await FetchPermissions({ user_id: id })) ?? [],
    enabled: !!id,
  });
}

// true / false once permissions are loaded, undefined while loading
export function useHasPermission(moduleName) {
  const { data: permissions } = usePermissions();
  return permissions?.some((permission) => permission.modules.name.includes(moduleName));
}

export function useCompanyUserCount(companyId) {
  return useQuery({
    queryKey: sessionKeys.userCount(companyId),
    queryFn: () => CountUsersByCompany({ company_id: companyId }),
    enabled: !!companyId,
  });
}
