import { create } from 'zustand';
import { v } from '../styles/variables';

export const useOperations = create((set) => ({
  //state
  type: 'i',
  dropdownTitle: 'Categorias ingresos',
  transactionsDropdownTitle: 'Ingresos',
  categoryColor: v.colorIncome,
  categoryBg: v.colorBgIncome,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,

  // functions
  setMonth: (p) => {
    set({ month: p });
  },

  setYear: (p) => {
    set({ year: p });
  },

  setTransactionsType: (p) => {
    set({ type: p.type });
    set({
      transactionsDropdownTitle: p.text,
    });
    set({
      categoryColor: p.color,
    });
    set({
      categoryBg: p.bgcolor,
    });
  },

  setType: (p) => {
    set({ type: p.type });
    set({
      dropdownTitle: p.text,
    });
    set({
      categoryColor: p.color,
    });
    set({
      categoryBg: p.bgcolor,
    });
  },
}));
