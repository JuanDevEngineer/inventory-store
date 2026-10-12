import { create } from "zustand";
import {
  SearchProducts,
  EditProduct,
  DeleteProduct,
  InsertProduct,
  FetchProducts,
  ReportStockAllProducts,ReportStockByProduct,ReportStockBelowMinimum,ReportKardexEntryExit,ReportValuedInventory
} from "../index";
export const useProductsStore = create((set, get) => ({
  search: "",
  setSearch: (p) => {
    set({ search: p });
  },
  productsData: [],
  selectedProduct: [],
  params: {},
  fetchProducts: async (p) => {
    const response = await FetchProducts(p);
    set({ params: p });
    set({ productsData: response });
    set({ selectedProduct: [] });
    return response;
  },
  selectProduct: (p) => {
    set({ selectedProduct: p });
  },
  insertProduct: async (p) => {
    await InsertProduct(p);
    const { fetchProducts } = get();
    const { params } = get();
    set(fetchProducts(params));
  },
  deleteProduct: async (p) => {
    await DeleteProduct(p);
    const { fetchProducts } = get();
    const { params } = get();
    set(fetchProducts(params));
  },

  editProduct: async (p) => {
    await EditProduct(p);
    const { fetchProducts } = get();
    const { params } = get();
    set(fetchProducts(params));
  },
  searchProducts: async (p) => {
    const response = await SearchProducts(p);
    set({ productsData: response });
    return response;
  },
  reportStockAllProducts: async (p) => {
    const response = await ReportStockAllProducts(p);
    return response;
  },
  reportStockByProduct: async (p) => {
    const response = await ReportStockByProduct(p);
    return response;
  },
  reportStockBelowMinimum: async (p) => {
    const response = await ReportStockBelowMinimum(p);
    return response;
  },
  reportKardexEntryExit: async (p) => {
    const response = await ReportKardexEntryExit(p);
    return response;
  },
  reportValuedInventory: async (p) => {
    const response = await ReportValuedInventory(p);
    return response;
  },

}));
