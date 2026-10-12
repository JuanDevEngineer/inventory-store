import { create } from 'zustand';
import { FetchAllModules } from '../index';

export const useGlobalStore = create((set) => ({
  //state
  modulesCheckData: [],
  modulesData: [],

  // functions
  setModulesCheckData: (p) => {
    set({ modulesCheckData: p });
  },
  fetchModules: async () => {
    const response = await FetchAllModules();
    set({ modulesData: response });
    return response;
  },
}));
