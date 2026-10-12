// Auth adapter over the sign_in / sign_up RPCs exposed by PostgREST.
// It mirrors the subset of the Supabase auth API the app used
// (signInWithPassword, signUp, signOut, getSession, onAuthStateChange)
// so the rest of the code does not depend on a specific backend.
import { API_URL } from './config';

const STORAGE_KEY = 'inventory.auth.session';
const listeners = new Set();

function readSession() {
  try {
    const session = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (session && session.expires_at * 1000 > Date.now()) return session;
  } catch {
    // ignore unreadable storage
  }
  return null;
}

function writeSession(session) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore unavailable storage
  }
}

function notify(event, session) {
  listeners.forEach((callback) => callback(event, session));
}

async function callRpc(name, body) {
  try {
    const response = await fetch(`${API_URL}/rpc/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) return { data: null, error: { message: data.message, code: data.code } };
    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: error.message } };
  }
}

export const auth = {
  // Current access token, used by the database client
  getAccessToken() {
    return readSession()?.access_token ?? null;
  },

  async getSession() {
    return { data: { session: readSession() }, error: null };
  },

  async signInWithPassword({ email, password }) {
    const { data, error } = await callRpc('sign_in', { email, password });
    if (error) return { data: { user: null, session: null }, error };
    writeSession(data);
    notify('SIGNED_IN', data);
    return { data: { user: data.user, session: data }, error: null };
  },

  // Creates the account without starting a session, so an admin can
  // register staff without being logged out.
  async signUp({ email, password }) {
    const { data, error } = await callRpc('sign_up', { email, password });
    if (error) return { data: { user: null }, error };
    return { data: { user: data.user }, error: null };
  },

  async signOut() {
    writeSession(null);
    notify('SIGNED_OUT', null);
    return { error: null };
  },

  onAuthStateChange(callback) {
    listeners.add(callback);
    Promise.resolve().then(() => callback('INITIAL_SESSION', readSession()));
    return {
      data: { subscription: { unsubscribe: () => listeners.delete(callback) } },
    };
  },
};
