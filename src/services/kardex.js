import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertKardex(p) {
  const { error } = await db.from('kardex').insert(p);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      footer: '<a href="">...</a>',
    });
  }
}

export async function FetchKardex(p) {
  const { data } = await db
    .rpc('get_company_kardex', { _company_id: p.company_id })
    .order('id', { ascending: false });
  return data;
}

export async function SearchKardex(p) {
  const { data } = await db
    .rpc('search_company_kardex', { _company_id: p.company_id, _search: p.search })
    .order('id', { ascending: false });
  return data;
}
