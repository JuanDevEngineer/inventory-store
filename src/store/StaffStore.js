import { create } from 'zustand';

// UI state only. Staff data comes from useStaff (src/hooks/queries).
export const useStaffStore = create((set) => ({
  // state
  search: '',
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
}));
