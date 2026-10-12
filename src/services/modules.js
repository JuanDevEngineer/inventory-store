import { db } from '../lib/db';

export async function FetchModules() {
  const { data } = await db.from('modules').select();
  return data;
}

export async function FetchAllModules() {
  const { data } = await db.from('modules').select();
  return data;
}
