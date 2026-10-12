import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertBrand(p) {
  const { error } = await db.rpc('insert_brand', p);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ya existe un registro con ' + p._description,
      footer: '<a href="">Agregue una nueva descripcion</a>',
    });
  }
}

export async function FetchBrands(p) {
  const { data } = await db
    .from('brands')
    .select()
    .eq('company_id', p.company_id)
    .order('id', { ascending: true });
  return data;
}

export async function DeleteBrand(p) {
  const { error } = await db.from('brands').delete().eq('id', p.id);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
}

export async function EditBrand(p) {
  const { error } = await db.from('brands').update(p).eq('id', p.id);
  if (error) {
    alert('Error al editar marca ' + error.message);
  }
}

export async function DeleteAllBrands(p) {
  const { error } = await db.from('brands').delete().eq('user_id', p.userId);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Datos reseteados',
    showConfirmButton: false,
    timer: 1000,
  });
}

export async function SearchBrands(p) {
  const { data } = await db
    .from('brands')
    .select()
    .eq('company_id', p.company_id)
    .ilike('description', '%' + p.description + '%');
  return data;
}
