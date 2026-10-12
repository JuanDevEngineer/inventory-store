import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertPermission(p) {
  const { error } = await db.from('permissions').insert(p).select();
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al insertar permisos ' + error.message,
      footer: '<a href="">error</a>',
    });
  }
}

export async function FetchPermissions(p) {
  const { data } = await db
    .from('permissions')
    .select('id, user_id, module_id, modules(name)')
    .eq('user_id', p.user_id);
  return data;
}

export async function DeletePermissions(p) {
  const { error } = await db.from('permissions').delete().eq('user_id', p.user_id);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
}
