import Swal from 'sweetalert2';
import { auth, db } from '../lib/db';
import { DeletePermissions, InsertPermission } from './permissions';

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

export async function SearchStaff(p) {
  const { data } = await db.rpc('search_company_staff', {
    _company_id: p._company_id,
    _search: p.search,
  });
  return data;
}

export async function DeleteUser(p) {
  const { error } = await db.from('users').delete().eq('id', p.id);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo eliminar el usuario. Si tiene movimientos de kardex no se puede borrar.',
    });
  }
}

// ---- multi-step operations

// Replaces a user's module permissions with the checked ones
async function SavePermissions(userId, permissionChecks) {
  await DeletePermissions({ user_id: userId });
  await Promise.all(
    permissionChecks
      .filter((item) => item.check)
      .map((item) => InsertPermission({ user_id: userId, module_id: item.id })),
  );
}

// Creates the login account, the user row, its company assignment and permissions
export async function CreateStaffMember(authParams, p, permissionChecks) {
  const { data, error } = await auth.signUp({
    email: authParams.email,
    password: authParams.password,
  });
  if (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    return null;
  }
  const newUser = await InsertUser({
    name: p.name,
    document_number: p.document_number,
    phone: p.phone,
    address: p.address,
    registered_at: new Date(),
    status: 'activo',
    auth_id: data.user.id,
    user_type: p.user_type,
    document_type: p.document_type,
    email: authParams.email,
  });
  await InsertCompanyUser({ company_id: p.company_id, user_id: newUser.id });
  await SavePermissions(newUser.id, permissionChecks);
  return newUser;
}

export async function UpdateStaffMember(p, permissionChecks) {
  await EditUser(p);
  await SavePermissions(p.id, permissionChecks);
}

// Sign up from the login screen: creates the account, signs in and creates
// the superadmin user (the database triggers create its company)
export async function RegisterAdminAccount(p) {
  await auth.signUp({ email: p.email, password: p.password });
  const { data, error } = await auth.signInWithPassword({
    email: p.email,
    password: p.password,
  });
  if (error) return null;
  await InsertUser({
    auth_id: data.user.id,
    registered_at: new Date(),
    user_type: p.user_type,
    email: p.email,
  });
  return data.user;
}
