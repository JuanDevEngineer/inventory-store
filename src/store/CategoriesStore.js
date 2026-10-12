import { create } from 'zustand';
import {
  SearchCategories,
  EditCategory,
  DeleteCategory,
  DeleteAllCategories,
  InsertCategory,
  FetchCategories,
} from '../index';

export const useCategoriesStore = create((set, get) => ({
  search: '',
  categoriesData: [],
  selectedCategory: [],
  params: {},
  setSearch: (p) => {
    set({ search: p });
  },
  fetchCategories: async (p) => {
    const response = await FetchCategories(p);
    set({ params: p });
    set({ categoriesData: response });
    set({ selectedCategory: response[0] });
    return response;
  },
  selectCategory: (p) => {
    set({ selectedCategory: p });
  },
  insertCategory: async (p) => {
    await InsertCategory(p);
    const { fetchCategories } = get();
    const { params } = get();
    set(fetchCategories(params));
  },
  deleteCategory: async (p) => {
    await DeleteCategory(p);
    const { fetchCategories } = get();
    const { params } = get();
    set(fetchCategories(params));
  },
  deleteAllCategories: async (p) => {
    await DeleteAllCategories(p);
    const { fetchCategories } = get();
    set(fetchCategories(p));
  },
  editCategory: async (p) => {
    await EditCategory(p);
    const { fetchCategories } = get();
    const { params } = get();
    set(fetchCategories(params));
  },
  searchCategories: async (p) => {
    const response = await SearchCategories(p);
    set({ categoriesData: response });
  },
}));
