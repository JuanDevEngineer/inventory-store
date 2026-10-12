// Read-only report queries. Product and kardex mutations invalidate ['reports'].
import { useQuery } from '@tanstack/react-query';
import {
  ReportKardexEntryExit,
  ReportStockAllProducts,
  ReportStockBelowMinimum,
  ReportStockByProduct,
  ReportValuedInventory,
} from '../../services/products';

const reportQuery = (name, params, queryFn, enabled) => ({
  queryKey: ['reports', name, params],
  queryFn: async () => (await queryFn()) ?? [],
  enabled,
});

export function useStockAllReport(companyId) {
  return useQuery(
    reportQuery('stock-all', { companyId }, () => ReportStockAllProducts({ company_id: companyId }), !!companyId),
  );
}

export function useStockByProductReport(companyId, productId) {
  return useQuery(
    reportQuery(
      'stock-by-product',
      { companyId, productId },
      () => ReportStockByProduct({ company_id: companyId, id: productId }),
      !!companyId && !!productId,
    ),
  );
}

export function useStockBelowMinimumReport(companyId) {
  return useQuery(
    reportQuery('stock-below-minimum', { companyId }, () => ReportStockBelowMinimum({ company_id: companyId }), !!companyId),
  );
}

export function useKardexEntryExitReport(companyId, productId) {
  return useQuery(
    reportQuery(
      'kardex-entry-exit',
      { companyId, productId },
      () => ReportKardexEntryExit({ _company_id: companyId, _product_id: productId }),
      !!companyId,
    ),
  );
}

export function useValuedInventoryReport(companyId) {
  return useQuery(
    reportQuery('valued-inventory', { companyId }, () => ReportValuedInventory({ _company_id: companyId }), !!companyId),
  );
}
