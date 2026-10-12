import { db } from '../lib/db';

export async function FetchCompany(p) {
  const { data } = await db
    .rpc('get_user_companies', { _user_id: p.userId })
    .maybeSingle();
  return data;
}

export async function CountUsersByCompany(p) {
  const { data } = await db
    .rpc('count_users_by_company', { _company_id: p.company_id })
    .maybeSingle();
  return data;
}
