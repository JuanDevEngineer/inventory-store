import { create } from 'zustand';
import { CountUsersByCompany, FetchCompany } from '../services/companies';

export const useCompanyStore = create((set) => ({
  // state
  userCount: [],
  companyData: [],

  // functions
  fetchCompany: async (p) => {
    const response = await FetchCompany(p);
    set({ companyData: response });
    return response;
  },

  countUsersByCompany: async (p) => {
    const response = await CountUsersByCompany(p);
    set({ userCount: response });
    return response;
  },
}));
