import { create } from 'zustand';
import { FetchAccount } from '../index';

export const useAccountStore = create((set) => ({
  // state
  selectedAccount: [],
  accountsData: [],
  // functions
  fetchAccount: async (p) => {
    const response = await FetchAccount(p);
    set({ accountsData: response });
    set({ selectedAccount: response });
    return response;
  },
}));
