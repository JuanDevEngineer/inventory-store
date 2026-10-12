import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Home,
  ProtectedRoute,
  Settings,
  Categories,
  Products,
  Brands,
  Staff,
  Company,
  Kardex,
  Reports,
  CurrentStockByProduct,
  StockBelowMinimum,
  KardexEntryExit,
  ValuedInventory,
} from '../index';

import CurrentStockAll from '../components/organisms/reports/CurrentStockAll';
import { Layout } from '../layouts/Layout';

export function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accessBy="non-authenticated">
            <Login />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/users"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Staff />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/categories"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Categories />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/products"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/brands"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Brands />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/company"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Company />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kardex"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Kardex />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute accessBy="authenticated">
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route path="current-stock-all" element={<CurrentStockAll />} />
        <Route
          path="current-stock-by-product"
          element={<CurrentStockByProduct />}
        />
        <Route path="stock-below-minimum" element={<StockBelowMinimum />} />
        <Route path="kardex-entries-exits" element={<KardexEntryExit />} />
        <Route path="valued-inventory" element={<ValuedInventory />} />
      </Route>
    </Routes>
  );
}
