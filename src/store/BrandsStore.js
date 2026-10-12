import { create } from 'zustand';
import {
  SearchBrands,
  EditBrand,
  DeleteBrand,
  InsertBrand,
  FetchBrands,
} from '../index';

export const useBrandsStore = create((set, get) => ({
  // state
  search: '',
  brandsData: [],
  selectedBrand: [],
  params: {},
  // functions
  setSearch: (p) => {
    set({ search: p });
  },
  fetchBrands: async (p) => {
    const response = await FetchBrands(p);
    set({ params: p });
    set({ brandsData: response });
    set({ selectedBrand: response[0] });
    return response;
  },
  selectBrand: (p) => {
    set({ selectedBrand: p });
  },
  insertBrand: async (p) => {
    await InsertBrand(p);
    const { fetchBrands } = get();
    const { params } = get();
    set(fetchBrands(params));
  },
  deleteBrand: async (p) => {
    await DeleteBrand(p);
    const { fetchBrands } = get();
    const { params } = get();
    set(fetchBrands(params));
  },

  editBrand: async (p) => {
    await EditBrand(p);
    const { fetchBrands } = get();
    const { params } = get();
    set(fetchBrands(params));
  },
  searchBrands: async (p) => {
    const response = await SearchBrands(p);
    set({ brandsData: response });
  },
}));
