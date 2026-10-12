import { create } from "zustand";
import {
  FetchTransactionsByMonthYear,
  InsertTransaction,
  DeleteTransaction,
  ReportTransactionsByMonthYear,
} from "../index";
export const useTransactionsStore = create((set, get) => ({
  transactionsData: [],
  transactionsReportData: [],
  monthYearTotal: 0,
  monthYearPaidTotal: 0,
  monthYearPendingTotal: 0,
  params: {},
  fetchTransactions: async (p) => {
    const response = await FetchTransactionsByMonthYear(p);
    set({ params: p });
    const { calculateTotals } = get();
    calculateTotals(response);
    set({ transactionsData: response });
    return response;
  },
  calculateTotals: (response) => {
    const paidItems = response?.filter((item) => item.status == 1);
    const pendingItems = response?.filter((item) => item.status == 0);
    let total = 0;
    let paidTotal = 0;
    let pendingTotal = 0;
    response?.forEach((item) => {
      const array = Object.values(item);
      total += array[2];
    });
    paidItems?.forEach((item) => {
      const array = Object.values(item);
      paidTotal += array[2];
    });
    pendingItems?.forEach((item) => {
      const array = Object.values(item);
      pendingTotal += array[2];
    });
    set({ monthYearTotal: total });
    set({ monthYearPaidTotal: paidTotal });
    set({ monthYearPendingTotal: pendingTotal });
  },
  insertTransaction: async (p) => {
    await InsertTransaction(p);

    const { fetchTransactions } = get();
    const { params } = get();
    set(fetchTransactions(params));
  },
  deleteTransaction: async (p) => {
    await DeleteTransaction(p);
    const { params } = get();
    const { fetchTransactions } = get();
    set(fetchTransactions(params));
  },
  reportTransactionsByMonthYear: async (p) => {
    const response = await ReportTransactionsByMonthYear(p);
    set({ transactionsReportData: response });
    return response;
  },
}));
