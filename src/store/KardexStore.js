import { create } from 'zustand';
import { SearchKardex, InsertKardex, FetchKardex } from '../index';

export const useKardexStore = create((set, get) => ({
  //state
  search: '',
  kardexData: [],
  selectedKardex: [],
  params: {},

  // functions
  setSearch: (p) => {
    set({ search: p });
  },
  insertKardex: async (p) => {
    await InsertKardex(p);
    const { fetchKardex } = get();
    const { params } = get();
    set(fetchKardex(params));
  },
  fetchKardex: async (p) => {
    const response = await FetchKardex(p);
    set({ params: p });
    set({ kardexData: response });
    return response;
  },
  searchKardex: async (p) => {
    const response = await SearchKardex(p);
    set({ kardexData: response });
    return response;
  },
}));
