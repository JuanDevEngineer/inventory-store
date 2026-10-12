import { create } from 'zustand';

// UI state only. Kardex data comes from useKardex (src/hooks/queries).
export const useKardexStore = create((set) => ({
  // state
  search: '',
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
}));
