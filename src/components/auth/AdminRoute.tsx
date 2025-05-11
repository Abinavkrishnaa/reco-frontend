import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}
