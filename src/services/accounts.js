// Legacy module from the expenses app this project started from.
// The "accounts" table does not exist in database/init.
import { db } from '../lib/db';

export async function FetchAccount(p) {
  const { data } = await db.from('accounts').select().eq('user_id', p.userId).maybeSingle();
  return data;
}
