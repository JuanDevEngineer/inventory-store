import { create } from 'zustand';
import { FetchPermissions } from '../index';
import { SettingsModulesData } from '../utils/staticData';

export const usePermissionsStore = create((set) => ({
  permissionsData: [],
  permissionsEditData: [],

  fetchPermissions: async (p) => {
    const response = await FetchPermissions(p);
    set({ permissionsData: response });
    let allDocs = [];
    SettingsModulesData.map((element) => {
      const hasPermission = response.some((permission) =>
        permission.modules.name.includes(element.title),
      );
      if (hasPermission) {
        allDocs.push({ ...element, state: true });
      } else {
        allDocs.push({ ...element, state: false });
      }
    });

    SettingsModulesData.splice(0, SettingsModulesData.length);
    SettingsModulesData.push(...allDocs);
    return response;
  },

  fetchPermissionsEdit: async (p) => {
    const response = await FetchPermissions(p);
    set({ permissionsEditData: response });
    return response;
  },
}));
