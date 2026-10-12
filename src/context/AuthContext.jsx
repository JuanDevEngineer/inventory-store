import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/db';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data: authListener } = auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user == null) {
          setUser(null);
        } else {
          setUser(session?.user);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// The hook lives next to its provider; Fast Refresh just reloads this file fully
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
