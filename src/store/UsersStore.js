import { create } from 'zustand';
import { auth } from '../lib/db';
import {
  EditUserThemeCurrency,
  FetchUser,
  InsertUser,
  InsertPermission,
  FetchAllUsers,
  InsertCompanyUser,
  EditUser,
  DeletePermissions,
} from '../index';

export const useUsersStore = create((set, get) => ({
  modulesCheckData: [],
  setModulesCheckData: (p) => {
    set({ modulesCheckData: p });
  },
  userId: 0,
  resetUserId: () => {
    set({ userId: 0 });
  },
  userData: [],
  allUsersData: [],
  fetchUser: async () => {
    const response = await FetchUser();
    set({ userData: response });
    if (response) {
      set({ userId: response.id });
      return response;
    } else {
      return [];
    }
  },
  fetchAllUsers: async (p) => {
    const response = await FetchAllUsers(p);
    set({ allUsersData: response });
    return response;
  },
  editUserThemeCurrency: async (p) => {
    await EditUserThemeCurrency(p);
    const { fetchUser } = get();
    set(fetchUser);
  },
  editUser: async (p, permissionChecks, company_id) => {
    await EditUser(p);
    const { fetchAllUsers } = get();
    await DeletePermissions({ user_id: p.id });
    permissionChecks.forEach(async (item) => {
      if (item.check) {
        let permissionParams = {
          user_id: p.id,
          module_id: item.id,
        };
        await InsertPermission(permissionParams);
      }
    });
    set(fetchAllUsers({ _company_id: company_id }));
  },
  insertAdminUser: async (p) => {
    // create the login account, then sign in with it
    await auth.signUp({
      email: p.email,
      password: p.password,
    });
    const { data, error } = await auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });
    if (error) {
      return null;
    }
    await InsertUser({
      auth_id: data.user.id,
      registered_at: new Date(),
      user_type: p.user_type,
      email: p.email,
    });

    return data.user;
  },
  insertUser: async (authParams, p, permissionChecks) => {
    // create the login account (does not change the current session)
    const { data, error } = await auth.signUp({
      email: authParams.email,
      password: authParams.password,
    });

    if (error) {
      return null;
    }

    const newUserData = await InsertUser({
      name: p.name,
      document_number: p.document_number,
      phone: p.phone,
      address: p.address,
      registered_at: new Date(),
      status: 'activo',
      auth_id: data.user.id,
      user_type: p.user_type,
      document_type: p.document_type,
      email: authParams.email,
    });
    await InsertCompanyUser({
      company_id: p.company_id,
      user_id: newUserData.id,
    });
    permissionChecks.forEach(async (item) => {
      if (item.check) {
        let permissionParams = {
          user_id: newUserData.id,
          module_id: item.id,
        };
        await InsertPermission(permissionParams);
      }
    });

    return data.user;
  },
}));
