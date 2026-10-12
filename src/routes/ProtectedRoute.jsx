import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useAuth();
  if (accessBy === 'non-authenticated') {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else if (accessBy === 'authenticated') {
    if (user) {
      return children;
    }
  }

  return <Navigate to="/login" />;
};
