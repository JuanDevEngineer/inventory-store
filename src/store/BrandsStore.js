import { create } from 'zustand';

// UI state only. Brand data comes from useBrands (src/hooks/queries).
export const useBrandsStore = create((set) => ({
  // state
  search: '',
  selectedBrand: [],
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
  selectBrand: (p) => {
    set({ selectedBrand: p });
  },
}));
