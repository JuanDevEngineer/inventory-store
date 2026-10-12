// Legacy module from the expenses app this project started from.
// The "transactions" table and its RPCs do not exist in database/init.
import Swal from 'sweetalert2';
import { db } from '../lib/db';

export async function InsertTransaction(p) {
  const { data, error } = await db.from('transactions').insert(p).select();
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ya existe un registro con ' + p.description,
      footer: '<a href="">Agregue una nueva descripcion</a>',
    });
  }
  if (data) {
    Swal.fire({
      icon: 'success',
      title: 'Registrado',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

export async function DeleteTransaction(p) {
  const { error } = await db.from('transactions').delete().eq('id', p.id);
  if (error) {
    alert('Error al eliminar ' + error.message);
  }
}

export async function FetchTransactionsByMonthYear(p) {
  const { data } = await db.rpc('transactions_by_month_year', {
    year: p.year,
    month: p.month,
    user_id: p.userId,
    category_type: p.category_type,
  });
  return data;
}

export async function ReportTransactionsByMonthYear(p) {
  const { data } = await db.rpc('report_transactions_by_month_year', {
    year: p.year,
    month: p.month,
    user_id: p.userId,
    category_type: p.category_type,
  });
  return data;
}
