import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertCategory(p) {
  const { error } = await db.rpc('insert_category', p);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ya existe un registro con ' + p._description,
      footer: '<a href="">Agregue una nueva descripcion</a>',
    });
  }
}

export async function FetchCategories(p) {
  const { data } = await db
    .from('categories')
    .select()
    .eq('company_id', p.company_id)
    .order('id', { ascending: true });
  return data;
}

export async function DeleteCategory(p) {
  const { error } = await db.from('categories').delete().eq('id', p.id);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
}

export async function EditCategory(p) {
  const { error } = await db.from('categories').update(p).eq('id', p.id);
  if (error) {
    alert('Error al editar categoria ' + error.message);
  }
}

export async function DeleteAllCategories(p) {
  const { error } = await db.from('categories').delete().eq('user_id', p.userId);
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

export async function SearchCategories(p) {
  const { data } = await db
    .from('categories')
    .select()
    .eq('company_id', p.company_id)
    .ilike('description', '%' + p.description + '%');
  return data;
}
