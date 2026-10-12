import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertProduct(p) {
  const { error } = await db.rpc('insert_product', p);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      footer: '<a href="">Agregue una nueva descripcion</a>',
    });
  }
}

export async function FetchProducts(p) {
  const { data } = await db.rpc('get_company_products', {
    _company_id: p._company_id,
  });
  return data;
}

export async function DeleteProduct(p) {
  const { error } = await db.from('products').delete().eq('id', p.id);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
}

export async function EditProduct(p) {
  const { error } = await db.from('products').update(p).eq('id', p.id);
  if (error) {
    alert('Error al editar producto ' + error.message);
  }
}

export async function SearchProducts(p) {
  const { data } = await db.rpc('search_company_products', {
    _company_id: p.company_id,
    _search: p.description,
  });
  return data;
}

// ---- reports

export async function ReportStockAllProducts(p) {
  const { data, error } = await db
    .from('products')
    .select()
    .eq('company_id', p.company_id);
  if (error) return;
  return data;
}

export async function ReportStockByProduct(p) {
  const { data, error } = await db
    .from('products')
    .select()
    .eq('company_id', p.company_id)
    .eq('id', p.id);
  if (error) return;
  return data;
}

export async function ReportStockBelowMinimum(p) {
  const { data, error } = await db.rpc('report_products_below_minimum', {
    _company_id: p.company_id,
  });
  if (error) return;
  return data;
}

export async function ReportKardexEntryExit(p) {
  let query = db.rpc('get_company_kardex', { _company_id: p._company_id });
  if (p._product_id) query = query.eq('product_id', p._product_id);
  const { data, error } = await query;
  if (error) return;
  return data;
}

export async function ReportValuedInventory(p) {
  const { data, error } = await db.rpc('valued_inventory', p);
  if (error) return;
  return data;
}
