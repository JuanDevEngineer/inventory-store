import { create } from 'zustand';
import { auth } from '../lib/db';

export const useAuthStore = create((set) => ({
  //state
  isAuth: false,
  authUserData: [],
  //functions
  signInWithEmail: async (p) => {
    const { data, error } = await auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });
    if (error) {
      return null;
    }
    return data.user;
  },
  signOut: async () => {
    const { error } = await auth.signOut();
    set({ isAuth: false });
    if (error)
      throw new Error(
        'A ocurrido un error durante el cierre de sesión' + error,
      );
  },
}));
