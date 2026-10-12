import { create } from 'zustand';

// UI state only. Category data comes from useCategories (src/hooks/queries).
export const useCategoriesStore = create((set) => ({
  // state
  search: '',
  selectedCategory: [],
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
  selectCategory: (p) => {
    set({ selectedCategory: p });
  },
}));
