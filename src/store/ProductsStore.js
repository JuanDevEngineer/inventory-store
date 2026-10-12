import { create } from 'zustand';

// UI state only. Product data comes from useProducts and the report hooks
// (src/hooks/queries).
export const useProductsStore = create((set) => ({
  // state
  search: '',
  selectedProduct: [],
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
  selectProduct: (p) => {
    set({ selectedProduct: p });
  },
}));
