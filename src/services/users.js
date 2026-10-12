import Swal from 'sweetalert2';
import { auth, db } from '../lib/db';

// Account id of the logged-in user (the "sub" of the session token)
export async function GetAuthUserId() {
  const {
    data: { session },
  } = await auth.getSession();
  return session?.user.id;
}

export async function InsertUser(p) {
  const { data, error } = await db.from('users').insert(p).select().maybeSingle();
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al insertar usuario ' + error.message,
      footer: '<a href="">error</a>',
    });
  }
  return data;
}

export async function InsertCompanyUser(p) {
  const { error } = await db.from('company_users').insert(p);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al insertar asignacion ' + error.message,
      footer: '<a href="">error</a>',
    });
  }
}

export async function FetchUser() {
  const authUserId = await GetAuthUserId();
  if (!authUserId) return null;
  const { data } = await db.from('users').select().eq('auth_id', authUserId).maybeSingle();
  return data;
}

export async function FetchAllUsers(p) {
  const { data } = await db.rpc('get_company_staff', {
    _company_id: p._company_id,
  });
  return data;
}

export async function EditUserThemeCurrency(p) {
  const { error } = await db.from('users').update(p).eq('id', p.id);
  if (error) {
    alert('Error al editar usuarios ' + error.message);
  }
  Swal.fire({
    icon: 'success',
    title: 'Datos modificados',
    showConfirmButton: false,
    timer: 1500,
  });
}

export async function EditUser(p) {
  const { error } = await db.from('users').update(p).eq('id', p.id);
  if (error) {
    console.error('EditUser', error.message);
  }
}
