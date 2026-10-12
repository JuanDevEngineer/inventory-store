// Database adapter: a PostgREST client with the same query builder the
// Supabase SDK uses (db.from(...).select().eq(...), db.rpc(...)).
// Every request carries the session JWT so PostgREST runs it as the
// "authenticated" role.
import { PostgrestClient } from '@supabase/postgrest-js';
import { API_URL } from './config';
import { auth } from './auth';

function fetchWithSession(input, init = {}) {
  const headers = new Headers(init.headers);
  const token = auth.getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}

export const db = new PostgrestClient(API_URL, { fetch: fetchWithSession });
